# 📱 Configuração de Redes Sociais

## 🖼️ Thumbnail para Compartilhamento

Este projeto agora inclui uma imagem de thumbnail profissional otimizada para compartilhamento em redes sociais.

### 📍 Localização da Imagem
```
/site/images/thumbnail-og.png
```

### 📏 Especificações
- **Dimensões**: 1200x630px (proporção 1.91:1)
- **Formato**: PNG
- **Tamanho**: ~1.8MB
- **Otimização**: Recomendada para Open Graph e Twitter Cards

### 🎨 Design
- Gradiente suave (lavanda → rosa)
- Logo/ícone cerebral com coração
- Informações principais:
  - Nome: Dra. Ana Clara Oliveira
  - Credencial: CRP 06/123456
  - Especialidade: Terapia Cognitivo-Comportamental
  - Diferenciais: Especialista TCC, Horários Flexíveis, Online e Presencial

---

## 🔍 Como Testar o Thumbnail

### Facebook / Meta
1. Acesse: https://developers.facebook.com/tools/debug/
2. Cole a URL do seu site
3. Clique em "Debug" ou "Scrape Again"
4. Verifique se a imagem aparece corretamente

### Twitter / X
1. Acesse: https://cards-dev.twitter.com/validator
2. Cole a URL do seu site
3. Clique em "Preview card"
4. Verifique o preview da imagem

### LinkedIn
1. Acesse: https://www.linkedin.com/post-inspector/
2. Cole a URL do seu site
3. Aguarde a análise
4. Verifique o preview

### WhatsApp
1. Envie a URL em uma conversa de teste
2. Aguarde o preview carregar
3. Verifique se a imagem e informações aparecem

---

## ✅ Meta Tags Implementadas

### Open Graph (Facebook, WhatsApp, LinkedIn)
```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://anaclarapsico.com.br">
<meta property="og:title" content="Dra. Ana Clara Oliveira | Psicóloga CRP 06/123456">
<meta property="og:description" content="Psicóloga especializada em Terapia Cognitivo-Comportamental. Atendimento presencial e online para ansiedade, burnout e desafios emocionais.">
<meta property="og:image" content="https://anaclarapsico.com.br/images/thumbnail-og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Dra. Ana Clara Oliveira - Psicóloga especializada em TCC">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Dra. Ana Clara Oliveira - Psicóloga">
```

### Twitter Card
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="https://anaclarapsico.com.br">
<meta name="twitter:title" content="Dra. Ana Clara Oliveira | Psicóloga CRP 06/123456">
<meta name="twitter:description" content="Psicóloga especializada em Terapia Cognitivo-Comportamental. Atendimento presencial e online para ansiedade, burnout e desafios emocionais.">
<meta name="twitter:image" content="https://anaclarapsico.com.br/images/thumbnail-og.png">
<meta name="twitter:image:alt" content="Dra. Ana Clara Oliveira - Psicóloga especializada em TCC">
```

---

## 🔧 Personalização

### Alterar o Domínio
Ao fazer deploy, atualize as URLs nas meta tags:

**Antes** (exemplo):
```html
<meta property="og:url" content="https://anaclarapsico.com.br">
<meta property="og:image" content="https://anaclarapsico.com.br/images/thumbnail-og.png">
```

**Depois** (seu domínio):
```html
<meta property="og:url" content="https://seudominio.com.br">
<meta property="og:image" content="https://seudominio.com.br/site/images/thumbnail-og.png">
```

### Gerar Nova Imagem
Se precisar criar um novo thumbnail:
1. Dimensões recomendadas: 1200x630px
2. Formato: PNG ou JPG
3. Peso máximo: 5MB (recomendado < 1MB)
4. Substituir: `site/images/thumbnail-og.png`
5. Limpar cache das redes sociais (usar ferramentas acima)

---

## 📚 Recursos Úteis

- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

---

## 💡 Dicas

1. **Cache**: Redes sociais fazem cache das imagens. Use as ferramentas de debug para forçar atualização
2. **HTTPS**: Certifique-se que o site está em HTTPS para melhor compatibilidade
3. **Tamanho**: Mantenha imagens abaixo de 1MB para carregamento rápido
4. **Teste**: Sempre teste em múltiplas plataformas antes de compartilhar amplamente

---

*Última atualização: 19/06/2026*
