<script>
  import { fade, slide } from 'svelte/transition';

  let { nextStep, tickets, phone = $bindable() } = $props();

  // 선택된 티켓만 필터링 (섹시한 요약을 위해)
  let selectedTickets = $derived(tickets.filter((t) => t.qty > 0));
  let totalAmount = $derived(tickets.reduce((acc, t) => acc + t.price * t.qty, 0));

  // 전화번호 자동 하이픈 포맷팅 로직
  function handleInput(e) {
    let value = e.target.value.replace(/[^0-9]/g, '');

    if (value.length < 4) {
      phone = value;
    } else if (value.length < 7) {
      phone = value.replace(/(\d{3})(\d{1,3})/, '$1-$2');
    } else if (value.length < 11) {
      // 10자리 규격 (예: 011-123-4567)
      phone = value.replace(/(\d{3})(\d{3})(\d{1,4})/, '$1-$2-$3');
    } else {
      // 11자리 규격 (예: 010-1234-5678)
      phone = value.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
    }
  }

  // 섹시하고 엄격한 유효성 검사
  let isValidPhone = $derived.by(() => {
    const rawNumber = phone.replace(/-/g, '');
    const prefix = rawNumber.slice(0, 3);

    // 1. 010으로 시작하면 반드시 11자리여야 함
    if (prefix === '010') {
      return rawNumber.length === 11;
    }

    // 2. 그 외 01X 번호는 10자리 또는 11자리 허용
    if (prefix.startsWith('01')) {
      return rawNumber.length === 10 || rawNumber.length === 11;
    }

    return false;
  });
</script>

<div class="confirm-container" in:fade>
  <div class="summary-card">
    <p class="sub mb-4">선택 내역</p>
    <div class="ticket-summary">
      {#each selectedTickets as ticket (ticket.label)}
        <div class="summary-item" transition:slide>
          <span class="label">{ticket.emoji} {ticket.label} <small>x{ticket.qty}</small></span>
          <span class="price">₩{(ticket.price * ticket.qty).toLocaleString()}</span>
        </div>
      {/each}
    </div>
    <div class="total-divider"></div>
    <div class="total-row">
      <span>총 결제 금액</span>
      <span class="total-price">₩{totalAmount.toLocaleString()}</span>
    </div>
  </div>

  <div class="input-section">
    <label for="phone">알림톡 받으실 번호</label>
    <div
      class="input-wrapper"
      class:valid={isValidPhone}
      class:error={phone.length > 10 && !isValidPhone}
    >
      <span class="prefix">📱</span>
      <input
        id="phone"
        type="tel"
        inputmode="numeric"
        placeholder="010-0000-0000"
        value={phone}
        oninput={handleInput}
        maxlength="13"
      />
    </div>

    {#if phone.replace(/-/g, '').startsWith('010') && phone.replace(/-/g, '').length === 10}
      <p class="error-hint" transition:fade>번호 한 자리가 부족합니다 (010은 11자리)</p>
    {:else}
      <p class="hint">입력하신 번호로 대기 순번 알림이 발송됩니다.</p>
    {/if}
  </div>

  <button class="btn-primary" disabled={!isValidPhone} onclick={nextStep}>
    {isValidPhone ? '결제하러 가기' : '번호를 입력해주세요'}
  </button>
</div>

<style>
  .confirm-container {
    display: flex;
    flex-direction: column;
    overflow: auto;
    gap: 30px;
  }

  .sub {
    color: #aaa;
    font-size: 0.9rem;
  }

  /* 요약 카드 스타일 */
  .summary-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 30px;
    padding: 25px;
  }

  .summary-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    font-size: 1.1rem;
  }

  .summary-item small {
    color: #00ffb2;
    margin-left: 8px;
    font-weight: 800;
  }

  .total-divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
    margin: 20px 0;
  }

  .total-row {
    display: flex;
    justify-content: space-between;
    font-size: 1.4rem;
    font-weight: 800;
  }

  .total-price {
    color: #00ffb2;
  }

  /* 입력 섹션 스타일 */
  .input-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  label {
    font-size: 0.9rem;
    color: #aaa;
    margin-left: 5px;
  }

  .input-wrapper {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.07);
    border: 2px solid transparent;
    border-radius: 20px;
    padding: 5px 20px;
    transition: all 0.3s;

    &:focus-within {
      border-color: #00ffb2;
      background: rgba(0, 255, 178, 0.05);
    }
  }

  .input-wrapper.valid {
    border-color: #00ffb2;
    background: rgba(0, 255, 178, 0.05);
  }

  .prefix {
    margin-right: 15px;
    font-size: 1.2rem;
  }

  input {
    background: transparent;
    border: none;
    color: white;
    font-size: 1.5rem;
    font-weight: 700;
    width: 100%;
    padding: 15px 0;
    outline: none;
    letter-spacing: 2px;
  }

  .hint {
    font-size: 0.85rem;
    color: #aaa;
    margin-left: 5px;
  }

  /* 기존 스타일 유지하며 추가 */
  .input-wrapper.error {
    border-color: #ff4747;
    background: rgba(255, 71, 71, 0.05);
  }

  .error-hint {
    font-size: 0.85rem;
    color: #ff4747;
    margin-left: 5px;
    font-weight: 600;
  }

  .btn-primary {
    margin-top: auto;
  }
</style>
