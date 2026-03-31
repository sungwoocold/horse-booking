// 상태 관리를 위한 클래스 기반 Rune
class KioskState {
	counts = $state({ preschool: 0, elementary: 0, student: 0, adult: 0 });
	categories = [
		{ key: 'preschool', label: '미취학아동', emoji: '👶', price: 30000, desc: '만 6세 이하' },
		{ key: 'elementary', label: '초등학생', emoji: '🧒', price: 50000, desc: '만 7~12세' },
		{ key: 'student', label: '학생', emoji: '🧑‍🎓', price: 60000, desc: '만 13~25세' },
		{ key: 'adult', label: '성인', emoji: '🧑', price: 70000, desc: '만 26세 이상' }
	];

	// 파생 상태 (Derived state) - 자동으로 계산됨
	totalPrice = $derived(
		this.categories.reduce((sum, cat) => sum + cat.price * this.counts[cat.key], 0)
	);

	totalPeople = $derived(Object.values(this.counts).reduce((a, b) => a + b, 0));

	updateCount(key, delta) {
		this.counts[key] = Math.max(0, Math.min(20, this.counts[key] + delta));
	}

	reset() {
		for (let key in this.counts) this.counts[key] = 0;
	}
}

export const kiosk = new KioskState();
