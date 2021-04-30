create_vote_choice_generator = (choice_number) => {
  const template = {
    title: '투표 선택지 생성하기',
    accept: '확인',
    decline: '취소',
    value: 'create_vote_done',
    blocks: [

		  ]
  }
  let i
  for (i = 0; i < choice_number; i++) {
    template.blocks.push({
		  type: 'label',
		  text: '*선택지 ' + (i + 1)+'*',
		  markdown: true
    })
    template.blocks.push({
		  type: 'input',
		  name: '선택지 ' + (i + 1),
		  required: true,
		  placeholder: '선택지를 입력해주세요. (필수)'
    })
  }
  return (template)
}
module.exports = create_vote_choice_generator
