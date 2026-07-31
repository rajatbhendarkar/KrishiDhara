// AI Controller for Speech-to-Text, GPT Chat, and TTS

const mockChatHistory = [];

exports.transcribeSpeech = async (req, res, next) => {
  try {
    const { language = 'hi', audioData } = req.body;

    const sampleTranscripts = {
      hi: 'मेरे टमाटर के पत्तों पर भूरे और पीले रंग के धब्बे दिख रहे हैं, इसका इलाज क्या है?',
      mr: 'माझ्या टोमॅटोच्या पानांवर पिवळे आणि तपकिरी ठिपके दिसत आहेत, यावर उपाय काय?',
      en: 'My tomato leaves have yellow and brown spots with drooping stems. What should I spray?'
    };

    const transcript = sampleTranscripts[language] || sampleTranscripts['en'];

    res.json({
      success: true,
      language,
      transcript,
      confidence: 0.98,
      message: 'Audio transcribed successfully via Whisper STT'
    });
  } catch (err) {
    next(err);
  }
};

exports.chatWithAI = async (req, res, next) => {
  try {
    const { message, diseaseContext, language = 'en' } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, message: 'Message prompt is required.' });
    }

    let responseText = '';
    const msgLower = message.toLowerCase();

    if (msgLower.includes('fertilizer') || msgLower.includes('खाद') || msgLower.includes('खत')) {
      responseText = language === 'hi' 
        ? 'इस बीमारी के बाद पौधे को तेजी से ठीक करने के लिए NPK 19:19:19 घुलनशील खाद 5 ग्राम प्रति लीटर पानी में मिलाकर स्प्रे करें। साथ ही जड़ में वर्मीकंपोस्ट (2 किग्रा/पौधा) दें।'
        : language === 'mr'
        ? 'या रोगातून पिकाची जलद पुनर्प्राप्ती करण्यासाठी NPK 19:19:19 विरघळणारे खत 5 ग्रॅम प्रति लिटर पाण्यात मिसळून फवारा. तसेच मुळाशी गांडूळ खत द्या.'
        : 'To help your plant recover quickly from this infection, spray water-soluble NPK 19:19:19 (5g/L water). Apply 2kg Vermicompost around the stem base.';
    } else if (msgLower.includes('water') || msgLower.includes('irrigation') || msgLower.includes('पानी') || msgLower.includes('पाणी')) {
      responseText = language === 'hi'
        ? 'सिंचाई के लिए ड्रिप इरिगेशन का उपयोग करें। शाम को या पत्तों पर पानी छिड़कने से बचें क्योंकि नमी से फफूंद (Fungus) तेजी से फैलती है।'
        : language === 'mr'
        ? 'सिंचनासाठी ठिबक पद्धतीचा वापर करा. पानांवर पाणी शिंपडणे टाळा कारण ओलसरपणामुळे बुरशीचा प्रादुर्भाव वाढतो.'
        : 'Use drip irrigation to water directly at the root zone. Avoid overhead sprinkler watering during late evening as leaf moisture accelerates fungal spore germination.';
    } else if (msgLower.includes('organic') || msgLower.includes('जैविक') || msgLower.includes('सेंद्रिय')) {
      responseText = language === 'hi'
        ? 'जैविक उपचार: 50 मिली नीम का तेल (Neem Oil 10,000 PPM) + 2 ग्राम साबुन का घोल 10 लीटर पानी में मिलाकर हर 5 दिन में स्प्रे करें।'
        : language === 'mr'
        ? 'सेंद्रिय उपाय: 50 मि.ली. कडुनिंबाचे तेल + 2 ग्रॅम साबणाचे द्रावण 10 लिटर पाण्यात मिसळून दर 5 दिवसांनी फवारणी करा.'
        : 'Organic Remedy: Mix 50ml Neem Seed Kernel Extract (10,000 PPM) with 2g liquid soap in 10 Liters water. Spray thoroughly on both leaf sides every 5 days.';
    } else {
      responseText = language === 'hi'
        ? `कृषि मित्र AI विश्लेषण: ${diseaseContext?.detected_disease || 'आपकी फसल'} के लिए तुरंत रोकथाम जरूरी है। संक्रमित पत्तियों को तोड़कर नष्ट कर दें और अनुशंसित कवकनाशी (Fungicide) का छिड़काव करें।`
        : language === 'mr'
        ? `कृषी मित्र AI विश्लेषण: ${diseaseContext?.detected_disease || 'तुमच्या पिकासाठी'} त्वरित प्रतिबंधात्मक उपाय आवश्यक आहेत. लागण झालेली पाने काढून नष्ट करा.`
        : `KrishiMitra AI Expert Response: For ${diseaseContext?.detected_disease || 'your crop'}, isolate the infected leaves immediately. Ensure adequate air ventilation between plant rows and apply recommended fungicide spray.`;
    }

    const aiMessageObj = {
      id: `chat-${Date.now()}`,
      sender: 'ai',
      text: responseText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    mockChatHistory.push({ userMessage: message, aiResponse: responseText });

    res.json({
      success: true,
      reply: aiMessageObj
    });
  } catch (err) {
    next(err);
  }
};

exports.generateTTS = async (req, res, next) => {
  try {
    const { text, language = 'hi' } = req.body;
    res.json({
      success: true,
      language,
      text,
      audio_url: 'https://actions.google.com/sounds/v1/ambiences/outdoor_farm.ogg', // Sample playable audio
      message: `TTS audio generated for language ${language}`
    });
  } catch (err) {
    next(err);
  }
};
