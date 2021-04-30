go_vote_generator = (row) => {
  const modal = {
	  title: '투표하기',
	  accept: '확인',
	  decline: '취소',
	  value: 'do_vote',
	  blocks: [
      {
		  type: 'label',
		  text: `*${row[0].vote_title}*\n\n`,
		  markdown: true
      }
	  ]
  }
  let i
  for (i = 0; i < row[0].choice_number; i++) {
	const option1 = 
		{
		  type: 'label',
		  text: `*${row[i].choice}*`,
		  markdown: true
        }
    const option2 = 
		{
		type: 'select',
			  name: `${row[i].id}`,
			  options: [
          		{
				  text: '선택',
				  value: '1'
        		},
				{
				  text: '미선택',
				  value: '0'
        		}
			  ],
			  required: true,
			  placeholder: '선택 여부'
	    }
    modal.blocks.push(option1)
    modal.blocks.push(option2)
  }
  return modal
}

module.exports = go_vote_generator
