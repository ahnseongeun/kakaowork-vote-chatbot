first_message_generator = (conversationId) => {
	return ({
		"conversationId": conversationId,
		"text": "챗vote조",
		"blocks": [
			{
			  "type": "header",
			  "text": "KakaoWork Chat-Vote✨",
			  "style": "yellow"
			},
			{
				"type": "image_link",
				"url": "https://portswigger.net/cms/images/2e/80/227d9e5335db-article-180816-smartphone-voting-body.jpg"
			},
			{
			  "type": "text",
			  "text": "카카오워크에서도 투표 기능을 사용하고 싶으신가요?! \n\n지금 바로 투표를 만들어 보세요👇",
			  "markdown": true
			},
			{
				"type": "button",
				"text": "투표 만들기",
				"style": "primary",
				"action_type": "call_modal",
				"value": "create_vote"
			}
		]
	})
}

module.exports = first_message_generator