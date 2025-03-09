# AI 對話情境訓練應用

![App Banner](https://via.placeholder.com/800x200?text=Conversation+Trainer)

## 📱 概述

這是一個專為非英語母語者設計的對話訓練應用，特別針對亞洲文化背景的使用者，幫助他們克服在西方情境中的小談話(small talk)和思辨表達挑戰。應用通過 AI 引導的日常情境對話，提供實時練習和反饋，使用者可以隨時記錄、回顧並持續改進自己的表達能力。

## 🎯 問題與解決方案

### 問題

非英語母語者，特別是來自亞洲文化背景（如台灣）的人士，即使具備基礎英語能力，在以下方面仍面臨挑戰：

- 缺乏西方式小談話(small talk)的文化經驗和練習機會
- 較少接觸西方教育體系中常見的思辨表達訓練
- 無法在真實情境中"試錯"練習英語對話技巧

### 解決方案

我們的應用提供一個安全、私密且高效的環境，使用者可以：

- 每日面對一個新的真實對話情境
- 與 AI 進行實時對話練習，培養反應能力
- 記錄並回顧過去的對話，分析進步空間
- 循序漸進地建立對話信心和思辨能力

## ✨ 核心功能

### 每日情境挑戰

- **AI 引導情境**：每天提供一個新的真實生活對話場景
- **計時討論**：AI 介紹情境後自動開始倒數計時
- **智能提示**：剩餘 20 秒時顯示收尾提醒

### 對話訓練

- **實時對話**：與 AI 進行自然流暢的來回對話
- **語音互動**：完全語音化的交流體驗
- **時間管理**：訓練在有限時間內清晰表達想法的能力

### 挑戰記錄

- **歷史列表**：時間順序顯示所有已完成的對話訓練
- **回顧功能**：隨時聆聽過去的對話內容
- **進步追蹤**：觀察自己表達能力的成長軌跡

### 會員專屬功能

| 功能         | 非會員 | 會員      |
| ------------ | ------ | --------- |
| 每日新情境   | ✅     | ✅        |
| 基本對話時間 | 1 分鐘 | 1 分鐘    |
| 對話延長機會 | ❌     | ✅ (2 次) |
| 歷史記錄回顧 | ✅     | ✅        |
| 繼續過去對話 | ❌     | ✅        |
| 情境難度選擇 | ❌     | ✅        |

## 🛠 技術實現

### 技術棧

- **前端框架**：React Native + Expo
- **導航系統**：Expo Router
- **狀態管理**：Zustand
- **樣式系統**：NativeWind (Tailwind CSS for React Native)
- **後端服務**：Supabase (認證、數據庫、存儲)
- **AI 整合**：OpenAI/Azure API
- **音頻處理**：Expo AV

### 數據結構

```sql
-- 情境表
CREATE TABLE public.scenarios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 對話記錄表
CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id),
  scenario_id UUID REFERENCES public.scenarios(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed BOOLEAN DEFAULT false
);

-- 對話消息表
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES public.conversations(id),
  is_user BOOLEAN DEFAULT true,
  content TEXT NOT NULL,
  audio_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 📱 用戶流程

### 首次使用流程

1. 下載應用並註冊/登錄
2. 完成 4 步引導介紹：

   - 西方對話文化介紹
   - 鼓勵自在表達
   - 使用限制說明
   - 每日挑戰說明

3. 進入主界面，開始第一次對話挑戰

### 每日挑戰流程

1. 從主界面選擇「今日挑戰」
2. AI 介紹今日情境並開始倒數計時
3. 用戶與 AI 進行 1 分鐘來回對話
4. 時間結束後顯示完成提示
5. 挑戰記錄自動保存至歷史列表

### 挑戰回顧流程

1. 從主界面進入「挑戰記錄」標籤
2. 選擇想要回顧的歷史對話
3. 進入詳情頁面聆聽完整對話內容
4. 會員用戶可選擇繼續該情境的對話

## 🗂 專案結構

```plaintext
app/
├── (tabs)/
│   ├── index.tsx         # 挑戰列表/主頁
│   ├── profile.tsx       # 用戶資料頁
│   └── _layout.tsx       # 標籤佈局
├── auth/
│   ├── login.tsx         # 登入頁面
│   ├── register.tsx      # 註冊頁面
│   └── _layout.tsx       # 認證頁面佈局
├── challenge/
│   ├── [id].tsx          # 挑戰回顧頁面
│   ├── today.tsx         # 今日挑戰頁面
│   └── _layout.tsx       # 挑戰頁面佈局
├── onboarding/
│   ├── [step].tsx        # 引導步驟頁面
│   └── _layout.tsx       # 引導頁面佈局
└── _layout.tsx           # 根佈局

components/
├── conversation/         # 對話相關組件
├── ui/                   # 通用UI組件
└── onboarding/           # 引導頁組件

stores/                   # Zustand狀態存儲
hooks/                    # 自定義hooks
lib/                      # 工具和庫
```

## 🚀 開發時程

### MVP 階段 (2-3 週)

[ ] 項目設置和配置
[ ] 基本認證功能
[ ] 引導流程
[ ] 情境展示界面
[ ] 基本對話功能(1 分鐘)
[ ] 簡單歷史記錄

### 第二階段 (2 週)

[ ] 音頻質量優化
[ ] 會員功能實現
[ ] 更多預設情境(10+)
[ ] 歷史對話延續功能

### 第三階段 (3 週)

[ ] 用戶反饋整合
[ ] 情境難度系統
[ ] 進步追蹤分析
[ ] 性能優化
