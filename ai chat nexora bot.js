// Chatbot functionality with enhanced AI features
document.addEventListener('DOMContentLoaded', function() {
    const chatWidget = document.getElementById('chatWidget');
    const openChatBtn = document.getElementById('openChatBtn');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const userInput = document.getElementById('userInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const chatMessages = document.getElementById('chatMessages');

    const responses = {
        default: "عذراً، لم أفهم سؤالك. هل يمكنك إعادة صياغته بطريقة أخرى؟ يمكنني مساعدتك في معرفة المزيد عن خدماتنا، أسعارنا، أو كيفية التواصل معنا.",
        greetings: [
            "مرحباً! كيف يمكنني مساعدتك اليوم؟",
            "أهلاً بك في Nexora! كيف حالك؟",
            "وعليكم السلام ورحمة الله وبركاته! يسعدني مساعدتك.",
            "هلا وغلا! كيف يمكنني خدمتك اليوم؟",
            "أهلاً وسهلاً! تشرفنا بخدمتك.",
            "صباح النور! كيف يمكنني مساعدتك؟",
            "مساء الخير! أنا هنا لمساعدتك.",
            "ياهلا! كيف حالك اليوم؟",
            "حياك الله! كيف يمكنني مساعدتك؟"
        ],
        services: {
            general: "نقدم مجموعة متكاملة من الخدمات التسويقية والإبداعية:",
            translation: "خدمات الترجمة الاحترافية تشمل:\n- ترجمة المواقع الإلكترونية\n- ترجمة المحتوى التسويقي\n- ترجمة الوثائق القانونية\n- ترجمة المحتوى التقني\n- خدمات التدقيق اللغوي",
            marketing: "خدمات التسويق الرقمي تشمل:\n- إدارة وسائل التواصل الاجتماعي\n- حملات الإعلانات المدفوعة\n- تحسين محركات البحث (SEO)\n- تسويق المحتوى\n- إدارة حملات البريد الإلكتروني",
            content: "خدمات كتابة المحتوى تشمل:\n- كتابة المقالات والمدونات\n- محتوى وسائل التواصل الاجتماعي\n- نصوص إعلانية\n- وصف المنتجات\n- المحتوى التقني",
            design: "خدمات التصميم الإبداعي تشمل:\n- تصميم الهوية البصرية\n- تصميم المواقع الإلكترونية\n- تصميم وسائل التواصل الاجتماعي\n- تصميم المطبوعات\n- تصميم الإعلانات"
        },
        pricing: {
            general: "نقدم أسعاراً تنافسية تناسب مختلف الميزانيات. الأسعار تعتمد على نطاق المشروع واحتياجاتك الخاصة.",
            translation: "أسعار الترجمة تبدأ من 0.08$ للكلمة، مع خصومات للمشاريع الكبيرة.",
            marketing: "باقات التسويق الرقمي تبدأ من 500$ شهرياً، وتشمل إدارة كاملة لحسابات التواصل الاجتماعي.",
            content: "أسعار كتابة المحتوى تبدأ من 0.10$ للكلمة، مع باقات شهرية مخصصة.",
            design: "تصميم الهوية البصرية يبدأ من 1000$، وتصميم وسائل التواصل الاجتماعي من 300$ شهرياً."
        },
        contact: {
            general: "يمكنك التواصل معنا عبر عدة قنوات:",
            email: "البريد الإلكتروني: info@nexora.com",
            phone: "الهاتف: +00000000000",
            social: "تابعنا على:\nفيسبوك: Nexora\nإنستغرام: @Nexora\nلينكد إن: Nexora",
            office: "مقرنا في مصر",
            form: "يمكنك أيضاً ملء نموذج التواصل في الأسفل وسنرد عليك خلال 24 ساعة."
        },
        portfolio: {
            translation: "لدينا خبرة في ترجمة مواقع لشركات عالمية وتقارير سنوية لمؤسسات كبرى.",
            marketing: "حققنا نجاحات كبيرة في حملات التسويق الرقمي، مع زيادة المبيعات بنسبة تصل إلى 150%.",
            content: "كتبنا محتوى لأكثر من 10 شركة في مختلف المجالات.",
            design: "صممنا هويات بصرية لعلامات تجارية رائدة في السوق."
        },
        team: "فريقنا يضم نخبة من المتخصصين في مجالات:\n- الترجمة الاحترافية\n- التسويق الرقمي\n- كتابة المحتوى\n- التصميم الإبداعي",
        process: {
            general: "نتبع منهجية عمل احترافية تضمن أفضل النتائج:",
            steps: "1. تحليل احتياجاتك\n2. وضع استراتيجية مخصصة\n3. التنفيذ باحترافية\n4. المراجعة والتحسين\n5. قياس النتائج"
        },
        services_questions: {
            general: {
                question: [
                    "ايه الخدمات اللي بتقدموها",
                    "بتقدموا ايه",
                    "ما هي خدماتكم",
                    "خدماتكم ايه",
                    "عندكم ايه",
                    "بتعملوا ايه بالظبط",
                    "ايه مجالات شغلكم"
                ],
                answer: "نقدم مجموعة متكاملة من الخدمات المتميزة 🌟\n\n\n" +

                    "1️⃣ خدمات الترجمة الاحترافية:\n" +
                    "   - ترجمة معتمدة للوثائق القانونية\n" +
                    "   - ترجمة المواقع والتطبيقات\n" +
                    "   - ترجمة المحتوى التقني والطبي\n" +
                    "   - خدمات التعريب الشامل\n\n\n" +

                    "2️⃣ خدمات التسويق الرقمي:\n" +
                    "   - إدارة حسابات السوشيال ميديا\n" +
                    "   - إدارة الحملات الإعلانية\n" +
                    "   - تحسين محركات البحث SEO\n" +
                    "   - التسويق عبر البريد الإلكتروني\n\n\n" +

                    "3️⃣ خدمات كتابة المحتوى:\n" +
                    "   - كتابة المقالات والمدونات\n" +
                    "   - محتوى السوشيال ميديا\n" +
                    "   - وصف المنتجات والخدمات\n" +
                    "   - المحتوى التقني والتسويقي\n\n\n" +

                    "4️⃣ خدمات التصميم الإبداعي:\n" +
                    "   - تصميم الهوية البصرية\n" +
                    "   - تصميم المواقع الإلكترونية\n" +
                    "   - تصميم السوشيال ميديا\n" +
                    "   - تصميم المطبوعات\n\n\n" +

                    "✨ مميزاتنا:\n" +
                    "   - فريق محترف متخصص\n" +
                    "   - جودة عالية في التنفيذ\n" +
                    "   - أسعار تنافسية\n" +
                    "   - دعم فني مستمر\n" +
                    "   - تسليم في الموعد المحدد\n\n\n" +

                    "للمزيد من التفاصيل عن أي خدمة، يمكنك السؤال عنها بشكل محدد 💫"
            },
            prices: {
                packages: {
                    question: ["الباقات", "عروض الاسعار", "باقات الخدمات"],
                    answer: "نقدم باقات متنوعة تناسب جميع الاحتياجات:\n\n\n" +

                        "1. الباقة الأساسية (500$ شهرياً):\n" +
                        "   - إدارة 3 منصات تواصل اجتماعي\n" +
                        "   - 15 تصميم شهرياً\n" +
                        "   - تقرير شهري\n\n\n" +

                        "2. الباقة المتقدمة (1000$ شهرياً):\n" +
                        "   - إدارة 5 منصات تواصل اجتماعي\n" +
                        "   - 30 تصميم شهرياً\n" +
                        "   - حملات إعلانية\n" +
                        "   - تقارير أسبوعية\n\n\n" +

                        "3. الباقة الاحترافية (2000$ شهرياً):\n" +
                        "   - إدارة كاملة لجميع المنصات\n" +
                        "   - تصاميم غير محدودة\n" +
                        "   - استراتيجية تسويق شاملة\n" +
                        "   - تقارير يومية"
                },
                contact: {
                    question: ["كيف اتواصل", "معلومات الاتصال", "ارقام التواصل"],
                    answer: "يمكنك التواصل معنا في أي وقت 📞\n\n\n" +

                        "📱 الواتساب (متاح 24/7):\n" +
                        "- +20000000000\n" +
                        "- رد فوري للحالات العاجلة\n\n\n" +

                        "📧 البريد الإلكتروني:\n" +
                        "- info@nexora.com\n" +
                        "- متابعة مستمرة للرسائل\n\n\n" +

                        "🌐 حساباتنا على السوشيال ميديا:\n" +
                        "- فيسبوك: https://www.facebook.com/profile.php?id=61575374715077\n" +
                        "- انستجرام: @Nexora\n" +
                        "- لينكد إن: https://www.linkedin.com/in/nexora-m-593039329/"
                }
            }
        },
        context_aware_responses: {
            pricing_after_service: {
                translation: "بناءً على اهتمامك بخدمات الترجمة، أود إخبارك أن أسعارنا تبدأ من 0.08$ للكلمة مع خصومات خاصة للمشاريع الكبيرة. هل تريد معرفة المزيد عن باقاتنا؟",
                marketing: "نظراً لاهتمامك بالتسويق الرقمي، لدينا باقات تبدأ من 500$ شهرياً تشمل إدارة كاملة لمنصات التواصل الاجتماعي. هل تريد معرفة تفاصيل الباقات؟",
            }
        }
    };

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

    // Enhanced message handling with context awareness
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleUserMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = '';
            processUserMessage(message);
        }
    }

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
            if (words.some(word => message.includes(word))) {
                if (!conversationContext.interests.includes(category)) {
                    conversationContext.interests.unshift(category);
                }
                return category;
            }
        }

        return null;
    }

    function processUserMessage(message) {
        message = message.trim().toLowerCase();
        const messageType = analyzeMessage(message);
        
        // Update context
        if (messageType) {
            conversationContext.lastTopic = messageType;
        }

        // Check for combined contexts
        if (messageType === 'pricing' && conversationContext.lastTopic) {
            const previousService = conversationContext.lastTopic;
            if (responses.context_aware_responses.pricing_after_service[previousService]) {
                setTimeout(() => {
                    addMessage(responses.context_aware_responses.pricing_after_service[previousService]);
                }, 500);
                return;
            }
        }

        // Handle greetings
        if (isGreeting(message)) {
            setTimeout(() => {
                const randomGreeting = responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
                addMessage(randomGreeting);
            }, 500);
            return;
        }

        // Service specific responses
        if (messageType === 'translation' || messageType === 'marketing' || 
            messageType === 'content' || messageType === 'design') {
            setTimeout(() => {
                addMessage(responses.services[messageType]);
                // Add follow-up suggestion
                setTimeout(() => {
                    addMessage("هل ترغب في معرفة أسعار هذه الخدمة؟");
                }, 500);
            }, 500);
            return;
        }

        // Pricing responses with context
        if (messageType === 'pricing') {
            setTimeout(() => {
                if (conversationContext.lastTopic && conversationContext.lastTopic !== 'pricing') {
                    addMessage(responses.pricing[conversationContext.lastTopic]);
                } else {
                    addMessage(responses.pricing.general);
                }
            }, 500);
            return;
        }

        // Contact information
        if (messageType === 'contact') {
            setTimeout(() => {
                addMessage(responses.contact.general + "\n" + responses.contact.email + "\n" + 
                         responses.contact.phone + "\n" + responses.contact.social);
            }, 500);
            return;
        }

        // Default response
        setTimeout(() => {
            addMessage(responses.default);
        }, 500);
    }

    // Helper function to check for greetings
    function isGreeting(message) {
        const greetings = [
            "مرحبا", "اهلا", "السلام", "هاي", "هلا", "صباح", "مساء",
            "صباح الخير", "مساء الخير", "صباح النور", "مساء النور", 
            "هلو", "سلام", "حياك"
        ];
        return greetings.some(greeting => message.toLowerCase().includes(greeting));
    }

    // Event listeners
    sendMessageBtn.addEventListener('click', handleUserMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });
});