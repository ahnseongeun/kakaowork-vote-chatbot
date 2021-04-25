// routes/index.js
const express = require('express');
const router = express.Router();

const libKakaoWork = require('../libs/kakaoWork');
const fs = require('fs');
// 1_2 투표만들기 input 저장 변수
var vote_message = {}
var vote_actions = {}
var vote_actions_time = {}
var vote_value = {}
var total_people = 0;
let block = fs.readFileSync(__dirname + '/../blocks/1.1_first_messege.json', 'utf8');
router.get('/', async (req, res, next) => {
  // 유저 목록 검색 (1)
  const users = await libKakaoWork.getUserList();

  // 검색된 모든 유저에게 각각 채팅방 생성 (2)
  const conversations = await Promise.all(
    users.map((user) => libKakaoWork.openConversations({ userId: user.id }))
  );
	total_people = await Promise.all(
		conversations.map((con) => con.users_count)
	);
	total_people = total_people - 1;
	console.log(total_people);
  // 생성된 채팅방에 메세지 전송 (3)
// 1.1
  const messages = await Promise.all(
	conversations.map((conversation) =>{
	  let obj = Object.assign({}, JSON.parse(block));
	  obj.conversationId = conversation.id;
	  return obj;
  })
).then(objs=>objs.map(obj=>{
	  console.log(obj);
	  libKakaoWork.sendMessage(obj);
  }))

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
		//2.3  
	case 'vote_selection_modal':
      	return res.json({
			view: {
			  title: "투표하기",
			  accept: "확인",
			  decline: "취소",
			  value: "vote_selection",
			  blocks: [
				{
				  type: "label",
				  text: "선택지를 고르세요",
				  markdown: true
				},
				{
				  type: "select",
				  name: "select_name",
				  options: [
					{
					  text: vote_actions.selection_1,
					  value: "1"
					},
					{
					  text: vote_actions.selection_2,
					  value: "2"
					},
					{
					  text: vote_actions.selection_3,
					  value: "3"
					},
					{
					  text: vote_actions.selection_4,
					  value: "4"
					}
				  ],
				  required: true,
				  placeholder: "선택지를 골라주세요"
				}
			  ]
			}

		});
		//2.4  
	case 'vote_control_modal':
      	return res.json({
			view:{
			  title: "투표 제어",
			  accept: "확인",
			  decline: "취소",
			  value: "vote_control",
			  blocks: [    
				{
				  type: "select",
				  name: "select",
				  options: [
					{
					  text: "투표현황 확인하기",
					  value: "vote_status"
					},
					{
					  text: "투표 끝내기",
					  value: "result_message"
					}
				  ],
				  required: true,
				  placeholder: "옵션을 선택해주세요"
				},
				{
				  type: "label",
				  text: "<p style=\"color:Tomato\">투표 끝내기는 투표 생성자만 가능합니다.</p>",
				  markdown: true
				}
			  ]
			}
		});
	break;
	default:
  }
});
// routes/index.js
router.post('/callback', async (req, res, next) => {
  const { message, actions, action_time, value } = req.body; // 설문조사 결과 확인 (2)
  console.log(actions);
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
		break;
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
	case "vote_control":
		  switch (actions.select) {
			  //2.5
			  case "vote_status":
				  await libKakaoWork.sendMessage({
					  conversationId: message.conversation_id,
					  text: vote_actions.votetitle + " 투표의 중간 집계가 도착하였습니다.",
					  blocks: [
						{
						  type: "header",
						  text: vote_actions.votetitle + "중간 집계",
						  style: "blue"
						},
						{
						  type: "divider"
						},
						{
						  type: "text",
						  text: "1) " +vote_actions.selection_1+" {} 표",
						  markdown: true
						},
						{
						  type: "text",
						  text: "2) " +vote_actions.selection_2+" {} 표",
						  markdown: true
						},
						{
						  type: "text",
						  text: "3) " +vote_actions.selection_3+" {} 표",
						  markdown: true
						},
						{
						  type: "text",
						  text: "4) " +vote_actions.selection_4+" {} 표",
						  markdown: true
						},
						{
						  type: "divider"
						},
						{
						  type: "description",
						  term: "참여율",
						  content: {
							type: "text",
							text: "{} of "+total_people,
							markdown: false
						  },
						  accent: true
						}
					  ]
					  
				  })
				  break;
			  //3.1
			  case "result_message":
				  await libKakaoWork.sendMessage({
					  conversationId: message.conversation_id,
					  text: "{"+vote_actions.votetitle+"}"+"의 투표결과가 도착했습니다.",
					  blocks: [
						{
						  type: "header",
						  text: "{"+vote_actions.votetitle+"}"+"투표 결과",
						  style: "blue"
						},
						{
						  type: "divider"
						},
						{
						  type: "text",
						  text: "1) " +vote_actions.selection_1+" {} 표",
						  markdown: true
						},
						{
						  type: "text",
						  text: "2) " +vote_actions.selection_2+" {} 표",
						  markdown: true
						},
						{
						  type: "text",
						  text: "3) " +vote_actions.selection_3+" {} 표",
						  markdown: true
						},
						{
						  type: "text",
						  text: "4) " +vote_actions.selection_4+" {} 표",
						  markdown: true
						},
						{
						  type: "divider"
						},
						{
						  type: "description",
						  term: "종료시간",
						  content: {
							type: "text",
							text: action_time,
							markdown: false
						  },
						  accent: true
						}     
					  ]
				  })
		  }	
    break;
    default:
  }

  res.json({ result: true });
});
module.exports = router;