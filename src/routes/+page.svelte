<script>
  import { scale } from 'svelte/transition';
  import GlassCard from '$lib/components/GlassCard.svelte';
  import StepLanding from '$lib/components/StepLanding.svelte';
  import StepTicket from '$lib/components/StepTicket.svelte';
  import KioskHeader from '$lib/components/KioskHeader.svelte';
  import StepAgreePay from '$lib/components/StepAgreePay.svelte';
  import StepConfirm from '$lib/components/StepConfirm.svelte';
  import StepPayment from '$lib/components/StepPayment.svelte';

  // --- Svelte 5 Runes ---
  let step = $state(0);
  let phone = $state('');
  let tickets = $state([
    { id: 'kid', emoji: '🐥', label: '영유아', age: '만 6세 이하', price: 30000, qty: 0 },
    { id: 'elem', emoji: '👦', label: '초등학생', age: '만 7~12세', price: 50000, qty: 0 },
    {
      id: 'univ',
      emoji: '🧑‍🎓',
      label: '중고등학생·대학생',
      age: '만 13~25세',
      price: 60000,
      qty: 0
    },
    { id: 'adult', emoji: '👨', label: '성인', age: '만 26세 이상', price: 70000, qty: 0 }
  ]);

  function nextStep() {
    step += 1;
  }

  function goBack() {
    if (step === 1) {
      tickets = tickets.map((t) => ({ ...t, qty: 0 }));
      phone = '';
    }

    if (step > 0) {
      step -= 1;
    }
  }

  function goHome() {
    step = 0;
  }
</script>

<GlassCard>
  <!-- 랜딩 페이지(step 0)가 아닐 때만 헤더 표시 -->
  {#if step > 0 && step < 4}
    <KioskHeader currentStep={step} onBack={goBack} onHome={goHome} />
  {/if}

  {#if step === 0}
    <StepLanding onStart={nextStep} />
  {:else if step === 1}
    <StepTicket {nextStep} {tickets} />
  {:else if step === 2}
    <StepConfirm {tickets} {nextStep} bind:phone />
  {:else if step === 3}
    <StepPayment {nextStep} {tickets} />
  {:else}
    <div class="step-container finish" transition:scale>
      <h1 class="success-icon">✨</h1>
      <h1>예약이 완료되었습니다!</h1>
      <p class="sub-text">카카오톡으로 발송된 링크에서<br />실시간 대기 순번을 확인하세요.</p>
      <button class="btn-primary" onclick={() => location.reload()}>처음으로</button>
    </div>
  {/if}
</GlassCard>

<style>
  :global(body) {
    background: radial-gradient(circle at top right, #1a2e24, var(--bg-dark));
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
  }

  .finish {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    text-align: center;
  }

  h1 {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 10px;
    letter-spacing: -1px;
  }

  .success-icon {
    font-size: 4rem;
    margin: 0;
  }

  .sub-text {
    color: #aaa;
    font-size: 0.9rem;
    margin-bottom: 30px;
  }
</style>
