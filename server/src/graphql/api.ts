import { readFileSync } from 'fs'
import { PubSub } from 'graphql-yoga'
import path from 'path'
import { getRepository } from 'typeorm'
import { check } from '../../../common/src/util'
import { Classes } from '../entities/Classes'
import { Friends } from '../entities/Friends'
import { Survey } from '../entities/Survey'
import { SurveyAnswer } from '../entities/SurveyAnswer'
import { SurveyQuestion } from '../entities/SurveyQuestion'
import { User } from '../entities/User'
import { Resolvers } from './schema.types'

export const pubsub = new PubSub()

export function getSchema() {
  const schema = readFileSync(path.join(__dirname, 'schema.graphql'))
  return schema.toString()
}

interface Context {
  user: User | null
  request: Request
  response: Response
  pubsub: PubSub
}

export const graphqlRoot: Resolvers<Context> = {
  Query: {
    self: (_, args, ctx) => ctx.user,
    survey: async (_, { surveyId }) => (await Survey.findOne({ where: { id: surveyId } })) || null,
    surveys: () => Survey.find(),
    //classes: async (_, { email }) => ((await Classes.find({ where: { id: email } })) || null) as any,
    classes: async (_, { email }) => (
      await getRepository(Classes)
        .createQueryBuilder('classes')
        .leftJoinAndSelect('classes.user', 'user')
        .where('user.email = :email', { email })
        .getMany()
    ) as any,
    friends: async (_, { email }) => (
      await getRepository(Friends)
        .createQueryBuilder('friends')
        .leftJoinAndSelect('friends.user', 'user')
        .where('user.email = :email', { email })
        .getOne()
    ) as any,
  },
  Mutation: {
    answerSurvey: async (_, { input }, ctx) => {
      const { answer, questionId } = input
      const question = check(await SurveyQuestion.findOne({ where: { id: questionId }, relations: ['survey'] }))

      const surveyAnswer = new SurveyAnswer()
      surveyAnswer.question = question
      surveyAnswer.answer = answer
      await surveyAnswer.save()

      question.survey.currentQuestion?.answers.push(surveyAnswer)
      ctx.pubsub.publish('SURVEY_UPDATE_' + question.survey.id, question.survey)

      return true
    },
    nextSurveyQuestion: async (_, { surveyId }, ctx) => {
      // check(ctx.user?.userType === UserType.Admin)
      const survey = check(await Survey.findOne({ where: { id: surveyId } }))
      survey.currQuestion = survey.currQuestion == null ? 0 : survey.currQuestion + 1
      await survey.save()
      ctx.pubsub.publish('SURVEY_UPDATE_' + surveyId, survey)
      return survey
    },
    createClass: async (_, { input }) => {
      const { title, rRule, zoom, startDate, endDate, email } = input

      const user = await User.findOne({ where: { email: email } })
      if (!user) {
        return false
      }

      const addClass = new Classes()
      addClass.title = title
      addClass.rRule = rRule
      addClass.zoom = zoom
      addClass.startDate = new Date(startDate)
      addClass.endDate = new Date(endDate)
      addClass.user = user
      await addClass.save()

      return true
    },
    addFriend: async (_, { input }) => {
      const { email, friend } = input

      const user = await User.findOne({ where: { email: email } })
      if (!user) {
        return false
      }

      const currFriends = await Friends.findOne({where: { user: user }})

      if (!currFriends) {
        const newFriend = new Friends()
        newFriend.user = user
        newFriend.friends = [friend]
        await newFriend.save()
      }
      else {
        currFriends.friends.push(friend)
        await currFriends.save()
      }

      return true
    },
  },
  Subscription: {
    surveyUpdates: {
      subscribe: (_, { surveyId }, context) => context.pubsub.asyncIterator('SURVEY_UPDATE_' + surveyId),
      resolve: (payload: any) => payload,
    },
  },
}
