alert_check_vote_generator = () => {
  return ({
    title: '아직 아무도 투표하지 않았습니다.',
    accept: '확인',
    decline: '취소',
    value: 'alert_check_vote_callback',
    blocks: [
      {
			  type: 'label',
			  text: '아직 아무도 투표하지 않았습니다.',
			  markdown: true
      },
      {
			  type: 'label',
			  text: '투표를 먼저 진행한 후 확인해보세요.',
			  markdown: true
      }
		  ]
  })
}
module.exports = alert_check_vote_generator
