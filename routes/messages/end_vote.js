start_vote_generator = (conversationId, row) => {
  const vote_title = row[0].vote_title
  const choices = []
  const choices_id = []
  const counts = []
  for (i in row) {
    data = row[i]
    if (choices_id.includes(data.id1)) {
    } else {
      choices_id.push(data.id1)
	  choices.push(data.c1)
    }
  }
  for (i = 0; i < choices.length; i++) {
    counts[i] = 0
  }
  for (i in row) {
    data = row[i]
    if (data.id1 == data.id2) {
      for (j = 0; j < choices_id.length; j++) {
        if (data.id2 == choices_id[j]) {
          counts[j] += 1
        }
      }
    }
  }
  const message = {
		  conversationId: conversationId,
		  text: `${vote_title}  투표가 종료되었습니다.`,
		  blocks: [
      {
			  type: 'header',
			  text: '투표가 종료되었습니다',
			  style: 'blue'
      },
      {
			  type: 'description',
			  term: '투표 제목',
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
			  text: '투표방 나가기',
			  action_type: 'call_modal',
			  value: 'close_vote',
			  style: 'primary'
  }
  for (key in choices) {
    const part = {
		  type: 'description',
		  term: `${choices[key]}`,
		  content: {
        type: 'text',
        text: `${counts[key]}` + ' 표',
        markdown: false
		  },
		  accent: true
    }
    message.blocks.push(part)
  }
  message.blocks.push(button1)
  return message
}

module.exports = start_vote_generator
