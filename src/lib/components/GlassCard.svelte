<script>
  let { children, padding = '30px', maxWidth = '550px' } = $props();
</script>

<div class="glass-card" style:padding style:max-width={maxWidth}>
  <!-- 노이즈 텍스처 (리얼리티 강화) -->
  <div class="noise"></div>

  <div class="content">
    {@render children()}
  </div>
</div>

<style>
  .glass-card {
    position: relative;
    width: 100vw;
    height: 90vh;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(40px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 48px;
    box-shadow:
      0 40px 100px rgba(0, 0, 0, 0.6),
      inset 0 0 0 1px rgba(255, 255, 255, 0.05);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  /* 미세한 필름 그레인 효과로 고급스러움 추가 */
  .noise {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.02;
    pointer-events: none;
    background-image: url('https://grainy-gradients.vercel.app/noise.svg');
    z-index: 1;
  }

  .content {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
