alert_create_vote_generator = () => {
  return ({
    title: '생성 중인 투표가 있습니다.',
    accept: '확인',
    decline: '취소',
    value: 'alert_create_vote_callback',
    blocks: [
      {
			  type: 'label',
			  text: '이미 생성중인 투표가 있습니다.',
			  markdown: true
      },
      {
			  type: 'label',
			  text: '투표를 끝까지 생성하거나 취소한 후 시도해주세요.',
			  markdown: true
      }
		  ]
  })
}
module.exports = alert_create_vote_generator
