create_vote_callback_generator = (conversationId, vote_title, choice_number, duplicated) => {
  return ({
		  conversationId: conversationId,
		  text: '이 투표를 완성해보세요.',
		  blocks: [
      {
			  type: 'header',
			  text: '투표가 거의 다 준비되었어요.',
			  style: 'blue'
      },
      {
			  type: 'text',
			  text: '투표 제목: ' + vote_title,
			  markdown: true
      },
      {
			  type: 'text',
			  text: '선택지 수: ' + choice_number + ' 개',
			  markdown: true
      },
	  {
			  type: 'text',
			  text: '중복 여부: ' + duplicated,
			  markdown: true
      },

      {
			  type: 'divider'
      },
      {
			  type: 'button',
			  text: '투표 완성하기',
			  style: 'primary',
			  action_type: 'call_modal',
			  value: 'create_vote_choice'
      },
      {
			  type: 'button',
			  text: '투표 취소하기',
			  style: 'default',
			  action_type: 'call_modal',
			  value: 'cancel_vote'
      }
		  ]
  })
 	}

module.exports = create_vote_callback_generator
