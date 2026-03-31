<script>
  import confetti from 'canvas-confetti';
  import { fade, scale } from 'svelte/transition';

  let { nextStep, tickets } = $props();

  let selectedPay = $state(''); // 'kakao', 'naver', 'toss'
  let showQR = $state(false);
  let totalAmount = $derived(tickets.reduce((acc, t) => acc + t.price * t.qty, 0));

  const payMethods = [
    {
      id: 'kakao',
      label: '카카오페이',
      color: '#FFEB00',
      textColor: '#3C1E1E',
      icon: '🟡',
      logo: '/images/logos/kakao-pay.png'
    },
    {
      id: 'naver',
      label: '네이버페이',
      color: '#03C75A',
      textColor: '#FFFFFF',
      icon: '🟢',
      logo: '/images/logos/naver-pay.svg'
    },
    {
      id: 'toss',
      label: '토스페이',
      color: '#0064FF',
      textColor: '#FFFFFF',
      icon: '🔵',
      logo: '/images/logos/tosspay.png'
    }
  ];

  function selectMethod(id) {
    selectedPay = id;
    showQR = true;
    // 실제로는 여기서 각 API에 맞는 QR 데이터를 호출합니다.
  }

  async function handlePayment() {
    // 1. 시각적 피드백 (Confetti) - 즉각 실행
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00FFB2', '#ffffff', '#1B3022']
    });

    // 2. 상태 변경 (완료 화면으로 이동)
    nextStep();

    // 3. 알림톡 발송 (비동기 처리)
    // try {
    //     const response = await fetch('/api/notify', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             tickets: tickets.filter(t => t.qty > 0),
    //             totalAmount: totalAmount,
    //             timestamp: Date.now()
    //         })
    //     });

    //     if (!response.ok) throw new Error('발송 실패');
    // } catch (err) {
    //     console.error('알림톡 발송 중 오류:', err);
    //     // 현장 운영 시에는 마스터 기기(관리자)에 로그를 남기는 로직을 추가하면 좋아.
    // }
  }
</script>

<div class="payment-container" in:fade>
  {#if !showQR}
    <p class="sub">원하시는 결제 방식을 선택해 주세요.</p>
    <div class="pay-grid">
      {#each payMethods as method (method.id)}
        <button
          class="pay-button"
          style:--brand-color={method.color}
          style:--text-color={method.textColor}
          onclick={() => selectMethod(method.id)}
          in:scale={{ duration: 300, delay: 100 }}
        >
          <div class="logo-wrapper">
            <img src={method.logo} alt={method.label} class="pay-logo" />
          </div>
          <span class="pay-label">{method.label}</span><span class="arrow">→</span>
        </button>
      {/each}
    </div>
  {:else}
    <div class="qr-section" in:scale={{ duration: 400, start: 0.9 }}>
      <div class="qr-wrapper">
        <img
          src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data={selectedPay}_dummy_data"
          alt="Payment QR"
        />
        <div
          class="qr-overlay"
          style:border-color={payMethods.find((m) => m.id === selectedPay)?.color}
        ></div>
      </div>
      <div class="pay-info">
        <p class="selected-label">
          {payMethods.find((m) => m.id === selectedPay)?.label}로 결제 진행 중
        </p>
        <h2 class="amount">{totalAmount.toLocaleString()}원</h2>
      </div>

      <button class="btn-ghost" onclick={() => (showQR = false)}>수단 변경</button>

      <!-- 실제 현장용: 결제 완료 확인 버튼 (원래는 웹훅이나 소켓으로 자동 처리) -->
      <button class="btn-primary" onclick={handlePayment}>결제 완료 확인</button>
    </div>
  {/if}
</div>

<style>
  .payment-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 30px;
  }

  .sub {
    color: #ccc;
    margin: 0;
  }

  /* 결제 수단 그리드 */
  .pay-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .pay-button {
    display: flex;
    align-items: center;
    padding: 20px 24px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .pay-button:active {
    transform: scale(0.96);
    background: var(--brand-color);
  }

  .pay-button:active .pay-label {
    color: var(--text-color);
  }

  .logo-wrapper {
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
  }

  .pay-logo {
    width: 100%;
    height: auto;
    object-fit: contain;
    /* SVG일 경우 약간의 필터를 주어 다크모드 최적화 가능 */
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  }

  .pay-label {
    flex: 1;
    font-size: 1.15rem;
    font-weight: 500;
    text-align: left;
  }

  .arrow {
    color: rgba(255, 255, 255, 0.3);
    font-size: 1.2rem;
    font-weight: 900;
  }

  /* QR 섹션 */
  .qr-section {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    gap: 25px;
    text-align: center;
    margin-top: 6rem;
  }

  .qr-wrapper {
    position: relative;
    padding: 20px;
    background: white;
    border-radius: 30px;
    display: inline-block;
  }

  .qr-overlay {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border: 4px solid transparent;
    border-radius: 20px;
    pointer-events: none;
  }

  .selected-label {
    color: #ccc;
    margin-bottom: 5px;
  }
  .amount {
    font-size: 2.2rem;
    margin: 0;
    font-weight: bold;
    color: #00ffb2;
  }

  .btn-primary {
    margin-top: auto;
  }

  .btn-ghost {
    background: transparent;
    border: none;
    color: #aaa;
    text-decoration: underline;
    cursor: pointer;
  }
</style>
