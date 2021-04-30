create_vote_callback_generator = (conversationId, vote_title, choice_number, duplicated) => {
  return ({
		  conversationId: conversationId,
		  text: '다음 단계로 이동하여 투표를 완성해보세요 :-)',
		  "blocks": [
		  {
			"type": "header",
			"text": "투표 만들기 (1/2) 단계",
			"style": "yellow"
		  },
		  {
			"type": "text",
			"text": "아래와 같은 투표를 만들어 드릴게요🧞\n",
			"markdown": true
		  },
		  {
			"type": "text",
			"text": "*투표 제목*: " + vote_title,
			"markdown": true
		  },
		  {
			"type": "text",
			"text": "*선택지 수*: " + choice_number + ' 개',
			"markdown": true
		  },
		{
			"type": "text",
			"text": "*중복 선택*: " + duplicated,
			"markdown": true
		  },

		  {
			"type": "text",
			"text": "\n다음 단계로 넘어가서 선택지를 입력하시면 투표가 완성됩니다✨",
			"markdown": true
		  },

		  {
			"type": "divider"
		  },
		  {
			"type": "button",
			"text": "투표 완성하기",
			"style": "primary",
			"action_type": "call_modal",
			"value": "create_vote_choice"
		  },
		  {
			"type": "button",
			"text": "투표 취소하기",
			"style": "default",
			"action_type": "submit_action",
			"action_name": "cancel_vote",
			"value": "cancel_vote"
		  }
		  ]
  })
 	}

module.exports = create_vote_callback_generator
