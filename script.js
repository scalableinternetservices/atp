import http from 'k6/http'
import { Counter, Rate } from 'k6/metrics'
import {sleep} from 'k6'

export const options = {
	scenarios: {
		example_scenario: {
			executor: 'ramping-arrival-rate',
			startRate: '50',
			timeUnit: '1s',
			preAllocatedVUs: 50,
			maxVUs: 100,
			stages: [
				{ target: 200, duration: '30s'},
				{ target: 0, duration: '30s'},
			],
		},
	},
}

/*
export default function () {
	http.get(
			'http://localhost:3000/app/index',
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
}
*/

// Test class fetching
// export default function () {
//   //sleep(1)
// 	http.post(
//       'http://localhost:3000/graphql',
//       '{"operationName":"FetchClasses","variables":{"email":"rothfels@cs.ucla.edu"},"query":"query FetchClasses($email: String!) {\\n  classes(email: $email) {\\n    ...Classes\\n    __typename\\n  }\\n}\\n\\nfragment Classes on Classes {\\n  id\\n  title\\n  rRule\\n  zoom\\n  startDate\\n  endDate\\n  __typename\\n}\\n"}',
// 			{
// 				headers: {
// 					'Content-Type': 'application/json',
// 				},
// 			}
//     )
// }

// Test friend fetching
// export default function () {
//   //sleep(1)
// 	http.post(
//       'http://localhost:3000/graphql',
//       '{"operationName":"FetchFriends","variables":{"email":"rothfels@cs.ucla.edu"},"query":"query FetchFriends($email: String!) {\\n  friends(email: $email) {\\n    ...Friends\\n    __typename\\n  }\\n}\\n\\nfragment Friends on Friends {\\n  id\\n  friends\\n   __typename\\n}\\n"}',
// 			{
// 				headers: {
// 					'Content-Type': 'application/json',
// 				},
// 			}
//     )
// }

// Test add class
export default function () {
  //sleep(1)
	http.post(
      'http://localhost:3000/graphql',
      '{"operationName":"AddClass","variables":{"input":{"title":"Test","rRule":"RRULE:INTERVAL=1;FREQ=WEEKLY;BYDAY=MO,WE","zoom":"https://www.amazon.com","startDate":"2020-11-09T21:00:00.000Z","endDate":"2020-11-09T22:00:00.000Z","email":"rothfels@cs.ucla.edu"}},"query":"mutation AddClass($input: ClassInput!) {\\n  createClass(input: $input)\\n}\\n"}',
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
    )
}

// Test fetch exam
// export default function () {
//   //sleep(1)
// 	http.post(
//       'http://localhost:3000/graphql',
//       '{"operationName":"FetchExams","variables":{"email":"jackbrewer7@yahoo.com"},"query":"query FetchExams($email: String!) {\\n  exams(email: $email) {\\n    ...Exams\\n    __typename\\n  }\\n}\\n\\nfragment Exams on Exam {\\n  id\\n  email\\n  title\\n  type\\n  date\\n  __typename\\n}\\n"}',
// 			{
// 				headers: {
// 					'Content-Type': 'application/json',
// 				},
// 			}
//     )
// }

// Test add exams
// export default function () {
//   //sleep(1)
// 	http.post(
//       'http://localhost:3000/graphql',
//       '{"operationName":"AddExam","variables":{"input":{"title":"Test","email":"jackbrewer7@yahoo.com","type":"Midterm","date":"2020-11-09T21:00:00.000Z"}},"query":"mutation AddExam($input: ExamInput!) {\\n  addExam(input: $input)\\n}\\n"}',
// 			{
// 				headers: {
// 					'Content-Type': 'application/json',
// 				},
// 			}
//     )
// }
