create_vote_generator = () => {
	return ({
		title: '투표 만들기 (1/2)',
		accept: '다음 단계로',
		decline: '취소하기',
		value: 'create_vote_callback',
		blocks: [{
				type: 'label',
				text: '*투표 제목*',
				markdown: true
			},
			{
				type: 'input',
				name: 'vote_title',
				required: true,
				placeholder: '투표 제목을 입력하세요 (필수)'
			},
			{
				type: 'label',
				text: '*선택지 수*',
				markdown: true
			},
			{
				type: 'select',
				name: 'choice_number',
				options: [{
						text: '2',
						value: '2'
					},
					{
						text: '3',
						value: '3'
					},
					{
						text: '4',
						value: '4'
					},
					{
						text: '5',
						value: '5'
					}
				],
				required: true,
				placeholder: '선택지 개수를 선택하세요 (필수)'
			},
			{
				type: 'label',
				text: '*중복 여부*',
				markdown: true
			},
			{
				type: 'select',
				name: 'duplicated_check',
				options: [{
						text: '중복 불가능',
						value: '0'
					},
					{
						text: '중복 가능',
						value: '1'
					}
				],
				required: true,
				placeholder: '중복 여부를 선택하세요 (필수)'
			},
			{
				type: 'label',
				text: '*투표 기간*',
				markdown: true
			},
			{
				type: 'select',
				name: 'vote_period',
				options: [{
						text: '2시간',
						value: '2'
					},
					{
						text: '6시간',
						value: '6'
					},
					{
						text: '하루',
						value: '24'
					},
					{
						text: '일주일',
						value: '168'
					}
				],
				required: true,
				placeholder: '투표 기간을 설정하세요 (필수)'
			}
		]
	})
}
module.exports = create_vote_generator