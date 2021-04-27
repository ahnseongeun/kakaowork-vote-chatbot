plz_vote_generator = (conversationId, choices, vote_title) => {
  String.prototype.replaceAt = function (index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length)
  }
  const message = {
		  conversationId: conversationId,
		  text: '투표 좀 해주세요!',
		  blocks: [
      {
			  type: 'header',
			  text: '투표 좀 해주세요!',
			  style: 'blue'
      },
      {
			  type: 'divider'
      },
      {
			  type: 'description',
			  term: '투표 명',
			  content: {
          type: 'text',
          text: `${vote_title}`,
          markdown: false
			  },
			  accent: true
      },
      {
			  type: 'divider'
      }
		  ]
  }
  const button1 = {
			  type: 'button',
			  text: '투표하기',
			  action_type: 'call_modal',
			  value: 'go_vote',
			  style: 'primary'
  }
  const button2 = {
			  type: 'button',
			  text: '투표현황',
			  action_type: 'call_modal',
			  value: 'check_vote',
			  style: 'default'
  }
  for (key in choices) {
    new_key = key.replaceAt(4, String(Number(key[4]) + 1))
    const part = {
		  type: 'description',
		  term: `${new_key}`,
		  content: {
        type: 'text',
        text: `${choices[key]}`,
        markdown: false
		  },
		  accent: true
    }
    message.blocks.push(part)
  }
  message.blocks.push(button1)
  message.blocks.push(button2)
  return message
}

module.exports = plz_vote_generator
