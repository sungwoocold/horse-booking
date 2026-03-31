<script>
  import './layout.css'; // 기본 마진/패딩 제거용
  let { children } = $props();
</script>

<div class="app-wrapper">
  <!-- 배경에 움직이는 은은한 오로라 효과 -->
  <div class="blob blob-1"></div>
  <div class="blob blob-2"></div>

  <main>
    {@render children()}
  </main>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: #050a08;
    font-family:
      'Pretendard',
      -apple-system,
      BlinkMacSystemFont,
      system-ui,
      sans-serif;
    color: white;
    overflow: hidden;
  }

  .app-wrapper {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: radial-gradient(circle at 50% 50%, #0d1a14 0%, #050a08 100%);
    overflow: hidden;
  }

  /* 섹시한 배경 블롭 애니메이션 */
  .blob {
    position: absolute;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(0, 255, 178, 0.1) 0%, transparent 70%);
    filter: blur(80px);
    z-index: 0;
  }

  .blob-1 {
    top: -100px;
    right: -100px;
    animation: float 20s infinite alternate;
  }
  .blob-2 {
    bottom: -100px;
    left: -100px;
    animation: float 25s infinite alternate-reverse;
  }

  @keyframes float {
    from {
      transform: translate(0, 0);
    }
    to {
      transform: translate(100px, 100px);
    }
  }

  main {
    position: relative;
    z-index: 10;
  }
</style>
