closed_vote_generator = () => {
	const modal = {
		"title": "종료된 투표",
		"accept": "확인",
		"decline": "취소",
		"value": "closed_vote",
		"blocks": [
    	{
    	  "type": "label",
    	  "text": "종료된 투표입니다 🤭",
    	  "markdown": true
    	}
  		]
	}
	return modal
}

module.exports = closed_vote_generator