<script>
  import confetti from 'canvas-confetti';
  import { fly } from 'svelte/transition';

  let { nextStep } = $props();

  let isAgreed = $state(false);

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

<div class="step-container" in:fly={{ x: 20 }}>
  <div class="agreement-box">
    [필수] 승마 체험 안전 수칙<br />
    - 말의 뒤쪽은 위험하오니 절대 접근 금지<br />
    - 체험 중 큰 소리를 내거나 갑작스러운 행동 자제<br />
    - 사고 방지를 위해 안전 요원의 지시 준수
  </div>

  <label class="check-label">
    <input type="checkbox" bind:checked={isAgreed} />
    <span>위 내용을 확인했으며 동의합니다.</span>
  </label>

  <div class="qr-section">
    <div class="qr-holder">
      <!-- QR Placeholder -->
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=HORSE_PAY" alt="QR" />
    </div>
    <p>결제 완료 후 자동으로 화면이 전환됩니다.</p>
  </div>

  <button class="btn-primary" disabled={!isAgreed} onclick={handlePayment}> 결제 완료 확인 </button>
</div>

<style>
  .agreement-box {
    background: rgba(0, 0, 0, 0.2);
    padding: 20px;
    border-radius: 20px;
    font-size: 0.85rem;
    line-height: 1.6;
    color: #ccc;
    margin-bottom: 20px;
  }

  .check-label {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 20px 0;
    cursor: pointer;
  }

  .qr-section {
    text-align: center;
    margin: 20px 0;
  }
  .qr-holder {
    background: white;
    display: inline-block;
    padding: 15px;
    border-radius: 20px;
  }
</style>
