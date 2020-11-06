import http from 'k6/http'
import { Counter, Rate } from 'k6/metrics'

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
