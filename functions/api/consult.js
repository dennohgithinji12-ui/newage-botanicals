/**
 * Cloudflare Pages Function: /api/consult
 * Sacred AI Herbalist powered by Google Gemini (gemini-3.5-flash-lite)
 * Grounded in NewAge Health Botanicals & Rituals pharmacopoeia
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  try {
    const body = await request.json();
    const userMessage = (body.message || "").trim();
    const history = Array.isArray(body.history) ? body.history : [];

    if (!userMessage) {
      return new Response(JSON.stringify({
        success: false,
        error: "Message is required"
      }), { status: 400, headers });
    }

    const apiKey = env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({
        success: false,
        error: "KEY_NOT_CONFIGURED",
        message: "GEMINI_API_KEY environment variable is not configured."
      }), { status: 503, headers });
    }

    const systemPrompt = `You are the Sacred Herbal Alchemist & Master Clinical Herbalist for NewAge Health Botanicals & Rituals (omnicorehub.app), an authentic East African luxury apothecary based in Nairobi & Thika, Kenya.

Your tone is grounded, poetic, deeply respectful of ancestral African earth medicine, yet scientifically rigorous and precise.

PHARMACOPOEIA CATALOG CONTEXT:
The apothecary features 168 authentic East African & global master botanical remedies:
- Master Clinical Protocols: Glucofort-X Pancreatic Protocol (Gymnema, Bitter Melon, Berberine), Hyperten-Arterial Shield (Rauvolfia, Olive leaf), Immuno-Apex Viral Protocol (African Potato Hypoxis rooperi, Sutherlandia frutescens, Artemisia annua).
- Intimate Vitality & Tissue Tonics: Titan Virility Massage Balm / Mjulubeng XL (Mondia whitei, Kigelia africana), FloraGrip Intimate Gel / Bana Tight (Oak Gall Quercus infectoria, Witch Hazel), Mwake Adaptogenic Tonic / Shugli Shot (Strychnos henningsii, Mondia whitei, Raw Honey), Sacred Yoni Flora Pearls.
- Skin & Hair Nectars: AcneClear Neem & Tea Tree Elixir, Nilotica Shea Butter, Marula & Frankincense Cellular Serum, African Black Soap Scalp Elixir, Baobab Stretch Mark Oil, Kigelia Breast & Tissue Firming Balm.
- Stress, Sleep & Vitality: Bedtime Dream Tisane (Chamomile, Catnip), Berberine Blood Sugar Matrix, Highland Ginger Cooler.

INSTRUCTIONS:
1. Address the seeker warmly with botanical wisdom.
2. Formulate a personalized recommendation matching their stated symptoms or vitality goals.
3. Recommend 1-3 specific remedies from the apothecary by name.
4. Provide practical, daily usage rituals (morning/evening water infusions, topical massage, dosage).
5. Always maintain confidentiality and reassure plain, unbranded packaging dispatch.
6. Provide 2-3 short follow-up questions or consultation chip suggestions at the end, formatted as:
SUGGESTIONS: ["Suggestion 1", "Suggestion 2", "Suggestion 3"]`;

    // Construct Gemini conversation format
    const contents = [];
    
    // Include last 6 turns of history
    history.slice(-6).forEach(h => {
      if (h.role === 'user') {
        contents.push({ role: 'user', parts: [{ text: h.content }] });
      } else if (h.role === 'assistant') {
        contents.push({ role: 'model', parts: [{ text: h.content }] });
      }
    });

    // Add current user message
    contents.push({ role: 'user', parts: [{ text: userMessage }] });

    const geminiPayload = {
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      contents: contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000
      }
    };

    const modelsToTry = ['gemini-3.5-flash-lite', 'gemini-3.5-flash'];
    let geminiResponseText = '';

    for (const model of modelsToTry) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(geminiPayload)
        });

        if (res.ok) {
          const resData = await res.json();
          const candidate = resData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidate && candidate.trim().length > 10) {
            geminiResponseText = candidate.trim();
            break;
          }
        }
      } catch (e) {
        // Continue to fallback model
      }
    }

    if (!geminiResponseText) {
      return new Response(JSON.stringify({
        success: false,
        error: "AI_GENERATION_FAILED",
        message: "Unable to contact celestial herbalist. Fall back to local pharmacopoeia."
      }), { status: 502, headers });
    }

    // Extract suggestions if present
    let suggestions = [];
    const sugMatch = geminiResponseText.match(/SUGGESTIONS:\s*(\[[^\]]+\])/i);
    let cleanText = geminiResponseText;
    if (sugMatch) {
      try {
        suggestions = JSON.parse(sugMatch[1]);
        cleanText = geminiResponseText.replace(/SUGGESTIONS:\s*\[[^\]]+\]/i, '').trim();
      } catch (e) {
        suggestions = [];
      }
    }

    // Match relevant products from catalog text keywords
    const lower = cleanText.toLowerCase();
    const matchedProductIds = [];
    if (lower.includes('glucofort') || lower.includes('blood sugar') || lower.includes('diabetes')) {
      matchedProductIds.push('glucofort-x-diabetes-pancreatic-cure');
    }
    if (lower.includes('immuno') || lower.includes('cd4') || lower.includes('hiv') || lower.includes('viral')) {
      matchedProductIds.push('immuno-apex-hiv-viral-defense-complex');
    }
    if (lower.includes('titan') || lower.includes('virility') || lower.includes('libido') || lower.includes('mjulubeng')) {
      matchedProductIds.push('mjulubeng-xl-mashine-pro-enlargement-balm');
    }
    if (lower.includes('floragrip') || lower.includes('yoni') || lower.includes('tight') || lower.includes('intimate')) {
      matchedProductIds.push('bana-tight-floragrip-intimate-gel');
    }
    if (lower.includes('mwake') || lower.includes('stamina') || lower.includes('energy') || lower.includes('shugli')) {
      matchedProductIds.push('mwake-tonic-shugli-shot');
    }
    if (lower.includes('acne') || lower.includes('blemish') || lower.includes('pimple')) {
      matchedProductIds.push('acne-clear-neem-tea-tree-blemish-elixir');
    }
    if (lower.includes('moringa')) {
      matchedProductIds.push('moringa-powder-organic');
    }
    if (lower.includes('sleep') || lower.includes('insomnia')) {
      matchedProductIds.push('bedtime-dream-tea');
    }

    return new Response(JSON.stringify({
      success: true,
      text: cleanText,
      productIds: Array.from(new Set(matchedProductIds)).slice(0, 3),
      suggestions: suggestions.length > 0 ? suggestions : [
        "How do I prepare this herbal ritual?",
        "How fast does this remedy take effect?",
        "Can I pay via M-Pesa on delivery?"
      ]
    }), { status: 200, headers });

  } catch (err) {
    return new Response(JSON.stringify({
      success: false,
      error: err.message
    }), { status: 500, headers });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
