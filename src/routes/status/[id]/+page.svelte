<script>
  import { fade, fly } from 'svelte/transition';

  let isCompleted = $state(false); // 실제로는 서버 상태를 fetch 해서 업데이트
  let waitCount = $state(3); // 내 앞에 몇 명?

  // 체험이 완료되면 후기 모드로 전환
  function toggleMode() {
    isCompleted = true;
  }
</script>

<div class="status-card">
  {#if !isCompleted}
    <div transition:fade>
      <h2>현재 대기 현황</h2>
      <div class="wait-circle">
        <span class="num">{waitCount}</span>
        <span class="label">내 앞 대기자</span>
      </div>
      <p>예상 대기 시간: <b>{waitCount * 15}분</b></p>
      <p class="notice">입장 순서가 되면 메시지를 보내드려요!</p>
    </div>
  {:else}
    <div transition:fly={{ y: 20 }}>
      <h2>체험은 어떠셨나요?</h2>
      <p>방금 전 승마 체험의 솔직한 후기를 남겨주세요.</p>
      <textarea placeholder="말과의 교감은 어땠나요?"></textarea>
      <button class="btn-primary" onclick={() => alert('후기가 등록되었습니다!')}
        >후기 제출하기</button
      >
    </div>
  {/if}
</div>

<style>
  /* status 전용 스타일링 - 생략 (메인과 유사한 유리 질감) */
  .wait-circle {
    width: 150px;
    height: 150px;
    border: 4px solid #00ffb2;
    border-radius: 50%;
    margin: 30px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .num {
    font-size: 3rem;
    font-weight: 800;
  }
</style>
