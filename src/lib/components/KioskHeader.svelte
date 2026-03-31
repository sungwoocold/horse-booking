<script>
  import { fade } from 'svelte/transition';

  // Svelte 5 props
  let { currentStep, onBack } = $props();

  // 0단계(랜딩)에서는 헤더를 숨기거나 로고만 표시하고,
  // 마지막 단계(성공)에서는 '처음으로'만 표시하는 로직
  let headerContent = $state('');

  $effect(() => {
    if (currentStep === 1) {
      headerContent = '인원 선택';
    } else if (currentStep === 2) {
      headerContent = '예약 내역 확인';
    } else if (currentStep === 3) {
      headerContent = '결제 진행';
    } else if (currentStep === 4) {
      headerContent = '안전 동의 및 결제';
    }
  });
</script>

<header class="kiosk-header" in:fade>
  <div class="left-action">
    <button class="icon-btn" onclick={onBack}>
      <span class="icon">이전</span>
    </button>
  </div>

  <div class="center-logo">
    <h1 class="logo-text">{headerContent}</h1>
  </div>

  <div class="right-space">
    <!-- 대칭을 위한 빈 공간 혹은 현재 시간/상태 표시 -->
  </div>
</header>

<style>
  .kiosk-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .icon-btn {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #ccc;
    padding: 8px 16px;
    border-radius: 12px;
    font-size: 0.9rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s;
    white-space: nowrap;
  }

  .icon-btn:active {
    transform: scale(0.95);
    background: rgba(255, 255, 255, 0.15);
  }

  .logo-text {
    font-size: 1.8rem;
    font-weight: 700;
  }

  .left-action,
  .right-space {
    flex: 1;
  }

  .center-logo {
    flex: 2;
    text-align: center;
  }
</style>
