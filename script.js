import http from 'k6/http'
import { Counter, Rate } from 'k6/metrics'
import sleep from 'k6'

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
export default function () {
  //sleep(1)
	http.get(
      'http://localhost:3000/graphql',
      '{"operationName":"FetchClasses","variables":{"email":"g.jikeyu@gmail.com"},"query":"query FetchClasses($email: String!) {\n  classes(email: $email) {\n    ...Classes\n    __typename\n  }\n}\n\nfragment Classes on Classes {\n  id\n  title\n  rRule\n  zoom\n  startDate\n  endDate\n  __typename\n}\n"}',
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
    )
}
