go_vote_generator = (row) => {
  const modal = {
	  title: '투표하기',
	  accept: '확인',
	  decline: '취소',
	  value: 'do_vote',
	  blocks: [
      {
		  type: 'label',
		  text: `*${row[0].vote_title}* \n`,
		  markdown: true
      },
      {
		  type: 'select',
		  name: 'choice_id',
		  options: [

		  ],
		  required: true,
		  placeholder: '옵션을 선택해주세요'
      }
	  ]
  }
  let i
  for (i = 0; i < row[0].choice_number; i++) {
    const option = {
			  text: `${row[i].choice}`,
			  value: `${row[i].id}`
    }
    modal.blocks[1].options.push(option)
  }
  return modal
}

module.exports = go_vote_generator
