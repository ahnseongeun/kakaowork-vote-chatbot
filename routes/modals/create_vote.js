create_vote_generator = () => {
  return ({
    title: '투표 생성하기',
    accept: '확인',
    decline: '취소',
    value: 'create_vote_callback',
    blocks: [
      {
			  type: 'label',
			  text: '투표 제목',
			  markdown: true
      },
      {
			  type: 'input',
			  name: 'vote_title',
			  required: true,
			  placeholder: '투표제목을 입력하세요 (필수)'
      },
      {
			  type: 'label',
			  text: '선택지 수',
			  markdown: true
      },
      {
			  type: 'select',
			  name: 'choice_number',
			  options: [
          {
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
          },
          {
				  text: '6',
				  value: '6'
          },
          {
				  text: '7',
				  value: '7'
          },
          {
				  text: '8',
				  value: '8'
          },
          {
				  text: '9',
				  value: '9'
          },
          {
				  text: '10',
				  value: '10'
          },
          {
				  text: '11',
				  value: '11'
          },
          {
				  text: '12',
				  value: '12'
          },
          {
				  text: '13',
				  value: '13'
          },
          {
				  text: '14',
				  value: '14'
          },
          {
				  text: '15',
				  value: '15'
          },
          {
				  text: '16',
				  value: '16'
          },
          {
				  text: '17',
				  value: '17'
          },
          {
				  text: '18',
				  value: '18'
          },
          {
				  text: '19',
				  value: '19'
          },
          {
				  text: '20',
				  value: '20'
          }
			  ],
			  required: true,
			  placeholder: '선택지 개수를 입력하세요 (필수)'
      }
		  ]
  })
}
module.exports = create_vote_generator
