<script>
  import { fly } from 'svelte/transition';
  import TicketItem from './TicketItem.svelte';

  let { nextStep, tickets } = $props(); // Svelte 5 snippets/props

  let totalAmount = $derived(tickets.reduce((acc, t) => acc + t.price * t.qty, 0));
  let totalQty = $derived(tickets.reduce((acc, t) => acc + t.qty, 0));
</script>

<div class="step-container" in:fly={{ x: 20 }}>
  <p class="sub">체험하실 인원을 선택해 주세요 (15~20분 소요)</p>

  <div class="ticket-list">
    {#each tickets as ticket (ticket.id)}
      <TicketItem bind:qty={ticket.qty} {...ticket} />
    {/each}
  </div>

  <div class="bottom-glass">
    <div class="row">
      <div class="flex justify-center gap-2">
        <span>총 결제 금액</span>
        {#if totalQty > 0}
          <span class="qty">({totalQty}명)</span>
        {/if}
      </div>
      <span class="price">{totalAmount.toLocaleString()}원</span>
    </div>
    <button class="btn-primary" disabled={totalQty === 0} onclick={nextStep}> 다음 단계로 </button>
  </div>
</div>

<style>
  .sub {
    color: #ccc;
    margin-bottom: 10px;
  }

  .ticket-list {
    flex: 1;
    scrollbar-width: none;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .bottom-glass {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    font-size: 1.4rem;
    font-weight: 700;
  }

  .price {
    color: var(--accent);
  }
</style>
