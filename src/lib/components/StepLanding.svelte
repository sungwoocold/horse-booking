<script>
  import { fade } from 'svelte/transition';
  let { onStart } = $props(); // Svelte 5 snippets/props
</script>

<div class="landing-container" onclick={onStart} in:fade={{ duration: 800 }}>
  <div class="hero-section">
    <div class="emoji-wrapper">
      <span class="horse-emoji">🐎</span>
      <div class="glow"></div>
    </div>

    <h1 class="title">
      <span class="brand">프리미엄</span><br />
      솔밭 승마 체험
    </h1>

    <p class="description">
      도심 속 특별한 교감, 20분의 마법<br />
      일일 승마체험에 오신 것을 환영합니다.
    </p>
  </div>

  <div class="touch-prompt">
    <div class="finger-icon">👆</div>
    <p>화면을 터치하여 시작하세요</p>
    <div class="ripple"></div>
  </div>
</div>

<style>
  .landing-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    text-align: center;
    cursor: pointer;
    user-select: none;
  }

  /* 상단 비주얼 영역 */
  .emoji-wrapper {
    position: relative;
    font-size: 5rem;
    margin-bottom: 20px;
    animation: float 3s ease-in-out infinite;
  }

  .horse-emoji {
    position: relative;
    z-index: 2;
  }

  .glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 120px;
    background: radial-gradient(circle, rgba(0, 255, 178, 0.4) 0%, transparent 70%);
    z-index: 1;
    filter: blur(10px);
  }

  .title {
    font-size: 2.8rem;
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -1.5px;
    margin: 0;
  }

  .brand {
    /* font-size: 1.2rem;
    text-transform: uppercase;
    letter-spacing: 5px;
    color: #00ffb2;
    font-weight: 400; */
    color: var(--accent);
    font-weight: 600;
    font-size: 1.5rem;
  }

  .description {
    margin-top: 20px;
    color: #888;
    font-size: 1.1rem;
    line-height: 1.6;
  }

  /* 하단 터치 유도 영역 */
  .touch-prompt {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .finger-icon {
    font-size: 2rem;
    animation: tap 1.5s ease-in-out infinite;
  }

  .touch-prompt p {
    font-size: 1.2rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
    letter-spacing: 1px;
  }

  /* 애니메이션 정의 */
  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @keyframes tap {
    0%,
    100% {
      transform: scale(1);
      opacity: 0.8;
    }
    50% {
      transform: scale(1.2);
      opacity: 1;
    }
  }

  /* 하단에 은은하게 퍼지는 리플 효과 */
  .ripple {
    position: absolute;
    top: 20px;
    width: 40px;
    height: 40px;
    background: rgba(0, 255, 178, 0.2);
    border-radius: 50%;
    animation: ripple-out 2s infinite;
  }

  @keyframes ripple-out {
    from {
      transform: scale(0);
      opacity: 1;
    }
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
</style>
