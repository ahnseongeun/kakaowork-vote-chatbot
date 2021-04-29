check_vote_admin_generator = (row) => {
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
  const modal = {
	  title: '투표 결과 확인',
	  accept: '확인',
	  decline: '취소',
	  value: 'do_admin',
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
  modal.blocks.push({
		  type: 'label',
		  text: '',
		  markdown: true
  })
  modal.blocks.push({
		  type: 'label',
		  text: '투표 관리',
		  markdown: true
  })
  modal.blocks.push({
		  type: 'select',
		  name: 'admin_mode',
		  options: [
      {
			  text: '투표 재촉하기',
			  value: 'plz_vote'
      },
      {
			  text: '투표 종료하기',
			  value: 'end_vote'
      }
		  ],
		  required: false,
		  placeholder: '옵션을 선택해주세요'
  })
  return modal
}

module.exports = check_vote_admin_generator
