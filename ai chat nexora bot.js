// Chatbot functionality with Groq API integration
document.addEventListener('DOMContentLoaded', function() {
    const chatWidget = document.getElementById('chatWidget');
    const openChatBtn = document.getElementById('openChatBtn');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const userInput = document.getElementById('userInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const chatMessages = document.getElementById('chatMessages');
    
    // API Configuration
    const GROQ_API_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
    // IMPORTANT: In production, use environment variables or a secure method to store API keys
    // Don't expose API keys in client-side code - this should be handled by your backend
    let GROQ_API_KEY = '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'; // This should be set securely from your backend
    
    // Conversation context to track user interaction
    let conversationContext = {
        lastTopic: null,
        interests: [],
        suggestedServices: [],
        messageHistory: []
    };

    // Handle chat widget visibility
    openChatBtn.addEventListener('click', () => {
        chatWidget.style.display = 'flex';
        // Animation
        void chatWidget.offsetWidth;
        chatWidget.classList.add('active');
        
        // If this is the first time opening the chat, send a greeting message
        if (conversationContext.messageHistory.length === 0) {
            setTimeout(() => {
                // Instead of using a static greeting, we'll use the API
                const initialSystemMessage = {
                    role: "system",
                    content: `أنت مساعد افتراضي محترف لشركة Nexora. شركتنا متخصصة في تقديم خدمات الترجمة الاحترافية، التسويق الرقمي، كتابة المحتوى، والتصميم الإبداعي.
                    
                    مهمتك هي استقبال العملاء بترحيب لطيف والرد على استفساراتهم باللغة العربية فقط.
                    
                    الآن قدم تحية ترحيبية موجزة وودية للعميل الجديد.`
                };
                const initialUserMessage = {
                    role: "user",
                    content: "مرحباً"
                };
                
                showTypingIndicator();
                callGroqAPI([initialSystemMessage, initialUserMessage]);
            }, 500);
        }
    });

    closeChatBtn.addEventListener('click', () => {
        chatWidget.classList.remove('active');
        setTimeout(() => {
            chatWidget.style.display = 'none';
        }, 300);
    });

    // Close chat when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideChat = chatWidget.contains(event.target);
        const isClickOnButton = openChatBtn.contains(event.target);
        
        if (chatWidget.style.display === 'flex' && !isClickInsideChat && !isClickOnButton) {
            chatWidget.classList.remove('active');
            setTimeout(() => {
                chatWidget.style.display = 'none';
            }, 300);
        }
    });

    // Prevent chat from closing when clicking inside
    chatWidget.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // UI Functions
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Show typing indicator while waiting for API response
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = '<span>.</span><span>.</span><span>.</span>';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function removeTypingIndicator() {
        const typingDiv = document.getElementById('typingIndicator');
        if (typingDiv) {
            typingDiv.remove();
        }
    }

    function handleUserMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = '';
            
            // Add message to history
            conversationContext.messageHistory.push({
                role: 'user',
                content: message
            });
            
            // Analyze the message for topic and context
            analyzeMessage(message);
            
            // Show typing indicator
            showTypingIndicator();
            
            // Process via API
            const systemMessage = createSystemMessage();
            const messages = [
                { role: "system", content: systemMessage },
                ...conversationContext.messageHistory.slice(-10) // Last 10 messages for context
            ];
            
            callGroqAPI(messages);
        }
    }

    // Message analysis functions to build better context
    function analyzeMessage(message) {
        const keywords = {
            translation: ['ترجمة', 'مترجم', 'لغات', 'تعريب'],
            marketing: ['تسويق', 'اعلان', 'سوشيال', 'حملات'],
            content: ['محتوى', 'كتابة', 'مقالات'],
            design: ['تصميم', 'شعار', 'لوجو', 'هوية'],
            pricing: ['سعر', 'تكلفة', 'كم', 'اسعار', 'باقات'],
            contact: ['تواصل', 'اتصال', 'رقم', 'عنوان']
        };

        for (const [category, words] of Object.entries(keywords)) {
            if (words.some(word => message.toLowerCase().includes(word))) {
                if (!conversationContext.interests.includes(category)) {
                    conversationContext.interests.unshift(category);
                }
                conversationContext.lastTopic = category;
                return category;
            }
        }

        return null;
    }

    // Create a comprehensive system message with all the knowledge base
    function createSystemMessage() {
        // Base system prompt
        let systemMessage = `أنت مساعد افتراضي محترف لشركة Nexora. يجب أن ترد دائماً باللغة العربية فقط.

شركتنا متخصصة في تقديم الخدمات التالية:

**خدمات الترجمة الاحترافية**:
- ترجمة المواقع الإلكترونية
- ترجمة المحتوى التسويقي
- ترجمة الوثائق القانونية
- ترجمة المحتوى التقني
- خدمات التدقيق اللغوي

**خدمات التسويق الرقمي**:
- إدارة وسائل التواصل الاجتماعي
- حملات الإعلانات المدفوعة
- تحسين محركات البحث (SEO)
- تسويق المحتوى
- إدارة حملات البريد الإلكتروني

**خدمات كتابة المحتوى**:
- كتابة المقالات والمدونات
- محتوى وسائل التواصل الاجتماعي
- نصوص إعلانية
- وصف المنتجات
- المحتوى التقني

**خدمات التصميم الإبداعي**:
- تصميم الهوية البصرية
- تصميم المواقع الإلكترونية
- تصميم وسائل التواصل الاجتماعي
- تصميم المطبوعات
- تصميم الإعلانات

**معلومات الأسعار**:
- أسعار الترجمة تبدأ من 0.08$ للكلمة، مع خصومات للمشاريع الكبيرة.
- باقات التسويق الرقمي تبدأ من 500$ شهرياً، وتشمل إدارة كاملة لحسابات التواصل الاجتماعي.
- أسعار كتابة المحتوى تبدأ من 0.10$ للكلمة، مع باقات شهرية مخصصة.
- تصميم الهوية البصرية يبدأ من 1000$، وتصميم وسائل التواصل الاجتماعي من 300$ شهرياً.

**باقاتنا**:
1. الباقة الأساسية (500$ شهرياً):
   - إدارة 3 منصات تواصل اجتماعي
   - 15 تصميم شهرياً
   - تقرير شهري

2. الباقة المتقدمة (1000$ شهرياً):
   - إدارة 5 منصات تواصل اجتماعي
   - 30 تصميم شهرياً
   - حملات إعلانية
   - تقارير أسبوعية

3. الباقة الاحترافية (2000$ شهرياً):
   - إدارة كاملة لجميع المنصات
   - تصاميم غير محدودة
   - استراتيجية تسويق شاملة
   - تقارير يومية

**معلومات التواصل**:
- البريد الإلكتروني: info@nexora.com
- الهاتف: +00000000000
- وسائل التواصل الاجتماعي: فيسبوك: Nexora - إنستغرام: @Nexora - لينكد إن: Nexora
- مقرنا في مصر

**تجربتنا**:
- لدينا خبرة في ترجمة مواقع لشركات عالمية وتقارير سنوية لمؤسسات كبرى.
- حققنا نجاحات كبيرة في حملات التسويق الرقمي، مع زيادة المبيعات بنسبة تصل إلى 150%.
- كتبنا محتوى لأكثر من 10 شركة في مختلف المجالات.
- صممنا هويات بصرية لعلامات تجارية رائدة في السوق.`;

        // Add context from the conversation
        if (conversationContext.lastTopic) {
            systemMessage += `\n\nالعميل مهتم خصوصاً بـ: ${conversationContext.lastTopic}`;
        }

        if (conversationContext.interests.length > 0) {
            systemMessage += `\n\nاهتمامات العميل تشمل: ${conversationContext.interests.join(', ')}`;
        }

        // Add formatting instructions
        systemMessage += `\n\nتعليمات إضافية:
- قدم إجابات موجزة ومباشرة.
- استخدم لغة ودية ومهنية.
- يمكنك استخدام الرموز التعبيرية بشكل معتدل.
- اذكر معلومات التواصل عندما يسأل العميل عن كيفية الاتصال.
- لا تخترع معلومات غير موجودة في المعلومات المقدمة لك.
- تعامل بالجنيه المصري مش بالدولار . يعني اي عمله في المعلومات عندك خليها بالجنيه متحولهاش لا غيرها لجنيه بنفي الرقم
- إذا كان العميل يبحث عن خدمة لا نقدمها، اقترح الخدمة الأقرب من خدماتنا المتاحة.`;

        return systemMessage;
    }

    // API Integration
    async function callGroqAPI(messages) {
        try {
            const response = await fetch(GROQ_API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${GROQ_API_KEY}`
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: messages,
                    temperature: 0.7,
                    max_tokens: 500
                })
            });
            
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            
            const result = await response.json();
            const botResponse = result.choices[0].message.content;
            
            // Remove typing indicator and add bot response
            removeTypingIndicator();
            addMessage(botResponse);
            
            // Add to message history
            conversationContext.messageHistory.push({
                role: 'assistant',
                content: botResponse
            });
            
        } catch (error) {
            console.error("Error calling API:", error);
            
            // Fallback for when API fails
            removeTypingIndicator();
            
            // Simple fallback response in case of API failure
            const fallbackResponse = "عذراً، واجهنا مشكلة في النظام. هل يمكنك المحاولة مرة أخرى لاحقاً؟ يمكنك أيضاً التواصل معنا مباشرة عبر البريد الإلكتروني info@nexora.com أو الهاتف +00000000000";
            addMessage(fallbackResponse);
            
            conversationContext.messageHistory.push({
                role: 'assistant',
                content: fallbackResponse
            });
        }
    }

    // Event listeners
    sendMessageBtn.addEventListener('click', handleUserMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });

    // Initialize with API key from backend
    // In a real implementation, you should load this securely from your server
    // This is just a placeholder for demonstration
    function initializeAPIKey() {
        // In a real implementation, you might do something like:
        // fetch('/api/get-groq-key')
        //     .then(response => response.json())
        //     .then(data => {
        //         GROQ_API_KEY = data.apiKey;
        //     });
        
        // For demo purposes:
        GROQ_API_KEY = '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'; // Replace with your actual key
    }
    
    // Call initialization
    initializeAPIKey();
});