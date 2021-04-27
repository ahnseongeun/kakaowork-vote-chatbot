first_message_generator = (conversationId) => {
  return ({
		  conversationId: conversationId,
		  text: '안녕하세요! 투표 챗봇입니다.',
		  blocks: [
      {
			  type: 'header',
			  text: '안녕하세요! 투표 챗봇입니다.',
			  style: 'blue'
      },
      {
			  type: 'button',
			  text: '투표 만들기',
			  style: 'default',
			  action_type: 'call_modal',
        value: 'create_vote'
      }
		  ]
  })
 	}

module.exports = first_message_generator
