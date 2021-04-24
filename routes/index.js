// routes/index.js
const express = require('express');
const router = express.Router();

const libKakaoWork = require('../libs/kakaoWork');
// 1_2 투표만들기 input 저장 변수
var vote_message = {}
var vote_actions = {}
var vote_actions_time = {}
var vote_value = {}
router.get('/', async (req, res, next) => {
  // 유저 목록 검색 (1)
  const users = await libKakaoWork.getUserList();

  // 검색된 모든 유저에게 각각 채팅방 생성 (2)
  const conversations = await Promise.all(
    users.map((user) => libKakaoWork.openConversations({ userId: user.id }))
  );

  // 생성된 채팅방에 메세지 전송 (3)
  // 1.1
  const messages = await Promise.all([
    conversations.map((conversation) =>
      libKakaoWork.sendMessage({
        conversationId: conversation.id,
        text: "투표하세요",
		blocks: [
	      {
			type: "header",
			text: "투표를 만드려면 버튼을 누르세요",
			style: "blue"
		  },
		  {
			type: "button",
			text: "투표 생성하기",
			style: "primary",
			action_type: "call_modal",
			value: "create_vote"
		  },
		],
      })
    ),
  ]);

  // 응답값은 자유롭게 작성하셔도 됩니다.
  res.json({
    users,
    conversations,
    messages,
  });
});
router.post('/request', async (req, res, next) => {
  const { message, value } = req.body;

  switch (value) {
	// 1.2
    case 'create_vote':
      return res.json({
        view: {
		  title: "투표 만들기",
		  accept: "확인",
		  decline: "취소",
		  value: "create_vote_modal",
		  blocks: [
			{
			  type: "input",
			  name: "votetitle",
			  required: true,
			  placeholder: "투표제목을 입력하세요 (필수)"
			},
			{
			  type: "label",
			  text: "선택지를 입력하세요",
			  markdown: true
			},
			{
			  type: "input",
			  name: "selection_1",
			  required: true,
			  placeholder: "내용을 입력해주세요 (필수)"
			},
			{
			  type: "input",
			  name: "selection_2",
			  required: true,
			  placeholder: "내용을 입력해주세요 (필수)"
			},
			{
			  type: "input",
			  name: "selection_3",
			  required: false,
			  placeholder: "내용을 입력해주세요"
			},
			{
			  type: "input",
			  name: "selection_4",
			  required: false,
			  placeholder: "내용을 입력해주세요"
			},
			{
			  type: "input",
			  name: "selection_5",
			  required: false,
			  placeholder: "내용을 입력해주세요"
			}
		  ]
        },
      });
			break;
		default:
  }
});
// routes/index.js
router.post('/callback', async (req, res, next) => {
  const { message, actions, action_time, value } = req.body; // 설문조사 결과 확인 (2)
  
  switch (value) {
	// 2.1
	case 'create_vote_modal':
		// 1.2에서 받은 input 값 저장
		vote_message = message;
  		vote_actions = actions;
  		vote_actions_time= action_time;
  		vote_value = value;
		await libKakaoWork.sendMessage({
			conversationId: message.conversation_id,
		    text: "투표 시작",
		    blocks: [
			  {
				type: "text",
				text: "참가할 인원을 방에 초대한 뒤 버튼을 눌러 투표를 시작하세요",
				markdown: true
			  },
			  {
				type: "button",
				text: "투표 시작",
				style: "primary",
				action_type:"submit_action",
				action_name:"accept",
				value:"vote_start"
			  }
			]	
		})
	// 2.2
	case "vote_start":
		  await libKakaoWork.sendMessage({
			conversationId: message.conversation_id,
			  text: "투표하기",
			  blocks: [
				{
				  type: "header",
				  text: vote_actions.votetitle,
				  style: "blue"
				},
				{
				  type: "divider"
				},
				{
				  type: "text",
				  text: vote_actions.selection_1,
				  markdown: true
				},
				{
				  type: "text",
				  text: vote_actions.selection_2,
				  markdown: true
				},
				{
				  type: "text",
				  text: vote_actions.selection_3,
				  markdown: true
				},
				{
				  type: "text",
				  text: vote_actions.selection_4,
				  markdown: true
				},
				{
				  type: "divider"
				},
				{
				  type: "description",
				  term: "작성자",
				  content: {
					type: "text",
					text: "작성자",
					markdown: false
				  },
				  accent: true
				},
				{
				  type: "description",
				  term: "시작일",
				  content: {
					type: "text",
					text: vote_actions_time,
					markdown: false
				  },
				  accent: true
				},
				{ 
				  type: "divider"
				},
				{
				  type: "action",
				  elements: [
					{
					  type: "button",
					  text: "투표하기",
					  style: "primary",
					  action_type: "call_modal",
				      value: "vote_selection_modal"
					},
					{
					  type: "button",
					  text: "투표 제어",
					  style: "default",
					  action_type: "call_modal",
				      value: "vote_control_modal"
					}
				  ]
				}
			  ]
		  })
    break;
    default:
  }

  res.json({ result: true });
});
module.exports = router;