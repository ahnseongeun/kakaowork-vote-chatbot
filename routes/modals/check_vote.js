check_vote_generator = (row) => {
  const vote_title = row[0].vote_title
  const choices_id = []
  const choices = []
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
  const modal = {
	  title: '투표 결과 확인',
	  accept: '확인',
	  decline: '취소',
	  value: 'do_nothing',
	  blocks: [
      {
		  type: 'label',
		  text: `${vote_title}`,
		  markdown: true
      }
	  ]
  }
  for (i = 0; i < choices.length; i++) {
    const block = {
		  type: 'label',
		  text: `${i + 1}` + ')\t' + `${choices[i]}` + '   \t\t ' + `${counts[i]}` + ' 표',
		  markdown: true
    }
    modal.blocks.push(block)
  }
  return modal
}

module.exports = check_vote_generator
