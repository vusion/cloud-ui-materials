<template>
  <div :class="$style.root">
    <div :class="$style.header">
      <h3>{{ title }}</h3>
    </div>
    <div :class="$style.messageList" ref="messageList">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="[$style.messageItem, msg.type === 'user' ? $style.userMessage : $style.botMessage]"
      >
        <div :class="[$style.messageContent, msg.isPlaceholder && $style.placeholder]">
          <span v-if="msg.isPlaceholder" :class="$style.loading">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span v-else>{{ msg.content }}</span>
        </div>
        <div :class="$style.messageTime">{{ msg.time }}</div>
      </div>
    </div>
    <div :class="$style.inputArea">
      <input
        v-model="inputMessage"
        :class="$style.input"
        :placeholder="placeholder"
        @keyup.enter="sendMessage"
        :disabled="loading"
      />
      <button
        :class="[$style.sendBtn, loading && $style.disabled]"
        @click="sendMessage"
        :disabled="loading"
      >
        发送
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cwd-chat-dialog',
  props: {
    title: {
      type: String,
      default: '胜小利智能对话'
    },
    userID: {
      type: String,
      default: 'user001'
    },
    wsUrl: {
      type: String,
      default: 'wss://eai.slof.com/yyzxhgk/api/websocket'
    },
    placeholder: {
      type: String,
      default: '请输入您的问题...'
    }
  },
  data() {
    return {
      inputMessage: '',
      messages: [],
      loading: false,
      ws: null,
      reconnectCount: 0,
      maxReconnectCount: 5,
      isReceiving: false
    };
  },
  mounted() {
    this.initWebSocket();
  },
  beforeDestroy() {
    this.closeWebSocket();
  },
  methods: {
    initWebSocket() {
      try {
        this.ws = new WebSocket(this.wsUrl);
        
        this.ws.onopen = () => {
          console.log('WebSocket连接已建立');
          this.reconnectCount = 0;
          this.$emit('connect');
        };
        
        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.result && data.success) {
              if (!this.isReceiving) {
                // 第一次接收到消息，添加一个占位消息显示正在回复
                this.isReceiving = true;
                this.addMessage('正在回复中...', 'bot', true);
              }
              
              // 如果消息完成（finish为true），则更新为完整消息
              if (data.finish) {
                this.updateLastBotMessage(data.result);
                this.loading = false;
                this.isReceiving = false;
                this.$emit('receive', { message: data.result, data });
              }
            }
          } catch (error) {
            console.error('解析消息失败:', error);
            this.loading = false;
            this.isReceiving = false;
          }
        };
        
        this.ws.onerror = (error) => {
          console.error('WebSocket错误:', error);
          this.loading = false;
          this.$emit('error', { error });
        };
        
        this.ws.onclose = () => {
          console.log('WebSocket连接已关闭');
          this.loading = false;
          this.$emit('disconnect');
          this.handleReconnect();
        };
        
      } catch (error) {
        console.error('WebSocket初始化失败:', error);
        this.$emit('error', { error });
      }
    },
    
    handleReconnect() {
      if (this.reconnectCount < this.maxReconnectCount) {
        this.reconnectCount++;
        console.log(`尝试第${this.reconnectCount}次重连...`);
        setTimeout(() => {
          this.initWebSocket();
        }, 3000);
      } else {
        console.error('已达到最大重连次数，停止重连');
      }
    },
    
    closeWebSocket() {
      if (this.ws) {
        this.ws.close();
        this.ws = null;
      }
    },

    sendMessage(messageText) {
      // 如果messageText是事件对象或不是字符串，则使用输入框的值
      const message = (typeof messageText === 'string' ? messageText : this.inputMessage).trim();
      if (!message || this.loading) return;
      
      this.addMessage(message, 'user');
      if (typeof messageText !== 'string') {
        this.inputMessage = '';
      }
      this.loading = true;
      
      const payload = {
        question: message,
        userID: this.userID,
        sxl: false,
        project: "低代码平台"
      };
      
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify(payload));
        this.$emit('send', { message, payload });
      } else {
        this.loading = false;
        this.addMessage('连接已断开，请稍后再试', 'system');
        this.initWebSocket();
      }
    },
    
    addMessage(content, type, isPlaceholder = false) {
      const now = new Date();
      const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      this.messages.push({
        content,
        type,
        time,
        isPlaceholder
      });
      
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    
    updateLastBotMessage(content) {
      // 找到最后一条机器人消息并更新内容
      for (let i = this.messages.length - 1; i >= 0; i--) {
        if (this.messages[i].type === 'bot') {
          this.messages[i].content = content;
          this.messages[i].isPlaceholder = false;
          break;
        }
      }
      
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    
    scrollToBottom() {
      if (this.$refs.messageList) {
        this.$refs.messageList.scrollTop = this.$refs.messageList.scrollHeight;
      }
    },
    
    clearMessages() {
      this.messages = [];
      this.isReceiving = false;
    }
  }
};
</script>

<style module>
.root {
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 500px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  background: #fafafa;
  border-radius: 8px 8px 0 0;
}

.header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.messageList {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background: #fff;
}

.messageItem {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
}

.userMessage {
  align-items: flex-end;
}

.botMessage {
  align-items: flex-start;
}

.messageContent {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
}

.userMessage .messageContent {
  background: #007AFF;
  color: white;
  border-bottom-right-radius: 4px;
}

.botMessage .messageContent {
  background: #f0f0f0;
  color: #333;
  border-bottom-left-radius: 4px;
}

.messageTime {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
  margin-left: 8px;
  margin-right: 8px;
}

.placeholder {
  display: flex;
  align-items: center;
  min-height: 20px;
}

.loading {
  display: flex;
  gap: 4px;
  align-items: center;
}

.loading span {
  width: 6px;
  height: 6px;
  background: #999;
  border-radius: 50%;
  animation: loading 1.4s infinite ease-in-out;
}

.loading span:nth-child(2) {
  animation-delay: 0.2s;
}

.loading span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes loading {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.inputArea {
  display: flex;
  padding: 16px;
  border-top: 1px solid #f0f0f0;
  gap: 12px;
  background: #fafafa;
  border-radius: 0 0 8px 8px;
}

.input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}

.input:focus {
  border-color: #007AFF;
}

.sendBtn {
  padding: 12px 24px;
  background: #007AFF;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  white-space: nowrap;
}

.sendBtn:hover:not(.disabled) {
  background: #0056b3;
}

.sendBtn.disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* 滚动条样式 */
.messageList::-webkit-scrollbar {
  width: 6px;
}

.messageList::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.messageList::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.messageList::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>