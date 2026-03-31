<script>
  let { label, age, price, emoji, qty = $bindable() } = $props();

  // 선택 여부 계산 (수량이 1 이상이면 활성화)
  let isSelected = $derived(qty > 0);
</script>

<div class="item" onclick={() => (qty += 1)} class:active={isSelected}>
  <div class="mb-3 flex items-center justify-between">
    <div class="flex items-center justify-center gap-3">
      <span class="text-3xl">{emoji}</span>
      <div>
        <h3 class="text-base font-bold">{label}</h3>
        <p class="text-xs">{age}</p>
      </div>
    </div>
    <span class="price">₩{price.toLocaleString()}</span>
  </div>
  <div class="qtyBg flex items-center justify-center gap-4 rounded-xl px-3 py-2.5">
    <button
      class="minus"
      onclick={(e) => {
        e.stopPropagation();
        qty = Math.max(0, qty - 1);
      }}>-</button
    >
    <span class="qty">{qty}</span>
    <button>+</button>
  </div>
</div>

<style>
  .item {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 20px;
    border-radius: 24px;
    transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1); /* 쫀득한 베지어 곡선 */
    cursor: pointer;
    user-select: none;
  }

  /* 쫀득한 클릭 효과 */
  .item:active {
    transform: scale(0.98);
    background: rgba(255, 255, 255, 0.08);
  }

  /* 선택된 상태 스타일 (Accent Border) */
  .item.active {
    border-color: #00ffb2;
    background: rgba(0, 255, 178, 0.05);
    box-shadow: 0 0 20px rgba(0, 255, 178, 0.1);
  }

  h3 {
    margin: 0 0 4px 0;
    font-size: 1.1rem;
  }
  p {
    margin: 0;
    font-size: 0.85rem;
    color: #888;
  }
  .price {
    color: var(--accent);
    font-weight: 600;
    font-size: 0.9rem;
  }

  button {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 9999px;
    background-color: rgb(0 255 178 / 0.2);
    color: rgb(0 255 178 / 1);
    font-size: 1.2rem;
    cursor: pointer;

    transition: all 0.15s ease;

    &.minus {
      background-color: rgb(255 255 255 / 0.05);
      color: rgb(139 139 158 / 1);
    }
  }

  .qtyBg {
    background-color: rgb(26 26 46 / 0.5);
  }

  .qty {
    font-size: 1.2rem;
    font-weight: bold;
    min-width: 20px;
    text-align: center;
  }
</style>
