<template>
	<div class="page-wrapper">
		<div class="animated-bg"></div>

		<div class="container shake">
			<!-- Animated Icon -->
			<div class="icon-container">
				<div class="icon-circle">
					<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor"
						stroke-width="1.5">
						<circle cx="12" cy="12" r="10"></circle>
						<path d="M12 8v4"></path>
						<path d="M12 16h.01"></path>
					</svg>
				</div>
			</div>

			<!-- Main Content -->
			<div class="content">
				<h1 class="title">Oops! 🚫</h1>

				<p class="subtitle">
					This doesn't seem to be a UI/UX design request
				</p>

				<p class="description">
					I'm specialized in helping with design feedback, usability improvements, and UI recommendations.
					This input doesn't relate to those topics.
				</p>

				<!-- Examples Section -->
				<div class="examples-section">
					<h3 class="examples-title">✨ Try asking about:</h3>
					<div class="examples-grid">
						<div class="example-card">
							<div class="example-icon">🎨</div>
							<p class="example-text">Improve mobile checkout usability</p>
						</div>
						<div class="example-card">
							<div class="example-icon">📊</div>
							<p class="example-text">Redesign dashboard navigation</p>
						</div>
						<div class="example-card">
							<div class="example-icon">♿</div>
							<p class="example-text">Accessibility issues in forms</p>
						</div>
					</div>
				</div>

				<!-- Action Buttons -->
				<div class="button-group">
					<button @click="retry" class="primary-btn">
						<span class="btn-icon">←</span>
						Go Back
					</button>
					<button @click="viewHome" class="secondary-btn">
						<span class="btn-icon">🏠</span>
						Home
					</button>
				</div>
			</div>


		</div>
	</div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const retry = () => {
	router.push("/");
};

const viewHome = () => {
	router.push("/");
};
</script>

<style scoped>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

.page-wrapper {
	min-height: 100vh;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	position: relative;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 40px 20px;
}

.animated-bg {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background:
		radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
		radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.1) 0%, transparent 50%);
	animation: gradientShift 15s ease infinite;
	z-index: 0;
	pointer-events: none;
}

@keyframes gradientShift {

	0%,
	100% {
		transform: translate(0, 0);
	}

	50% {
		transform: translate(30px, -30px);
	}
}

.container {
	position: relative;
	z-index: 1;
	max-width: 600px;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 40px;
	animation: slideInUp 0.8s ease;
}

@keyframes slideInUp {
	from {
		opacity: 0;
		transform: translateY(40px);
	}

	to {
		opacity: 1;
		transform: translateY(0);
	}
}

/* Icon Animation */
.icon-container {
	animation: bounceIn 0.8s ease;
}

@keyframes bounceIn {
	0% {
		opacity: 0;
		transform: scale(0.3);
	}

	50% {
		opacity: 1;
	}

	100% {
		opacity: 1;
		transform: scale(1);
	}
}

.icon-circle {
	width: 120px;
	height: 120px;
	border-radius: 50%;
	background: rgba(255, 255, 255, 0.1);
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	animation: pulse 2.5s ease infinite;
	backdrop-filter: blur(10px);
}

@keyframes pulse {

	0%,
	100% {
		box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
	}

	50% {
		box-shadow: 0 0 0 20px rgba(255, 255, 255, 0);
	}
}

/* Content */
.content {
	text-align: center;
	color: white;
	animation: fadeInUp 0.8s ease 0.2s both;
}

@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translateY(20px);
	}

	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.title {
	font-size: 3rem;
	font-weight: 700;
	margin-bottom: 15px;
	text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
	letter-spacing: -1px;
}

.subtitle {
	font-size: 1.3rem;
	font-weight: 500;
	margin-bottom: 20px;
	opacity: 0.95;
	line-height: 1.6;
}

.description {
	font-size: 1rem;
	opacity: 0.85;
	line-height: 1.8;
	margin-bottom: 40px;
	max-width: 450px;
}

/* Examples Section */
.examples-section {
	margin: 30px 0;
	animation: fadeInUp 0.8s ease 0.4s both;
}

.examples-title {
	font-size: 1.1rem;
	margin-bottom: 20px;
	font-weight: 600;
	opacity: 0.95;
}

.examples-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
	gap: 15px;
	margin-bottom: 20px;
}

.example-card {
	background: rgba(255, 255, 255, 0.1);
	border: none;
	border-radius: 12px;
	padding: 20px 15px;
	backdrop-filter: blur(10px);
	transition: all 0.3s ease;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	animation: popIn 0.6s ease backwards;
}

.example-card:nth-child(1) {
	animation-delay: 0.4s;
}

.example-card:nth-child(2) {
	animation-delay: 0.5s;
}

.example-card:nth-child(3) {
	animation-delay: 0.6s;
}

@keyframes popIn {
	from {
		opacity: 0;
		transform: scale(0);
	}

	to {
		opacity: 1;
		transform: scale(1);
	}
}

.example-card:hover {
	background: rgba(255, 255, 255, 0.15);
	border: none;
	transform: translateY(-8px);
	box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.example-icon {
	font-size: 2rem;
	animation: float 3s ease-in-out infinite;
}

.example-card:nth-child(2) .example-icon {
	animation-delay: 0.3s;
}

.example-card:nth-child(3) .example-icon {
	animation-delay: 0.6s;
}

@keyframes float {

	0%,
	100% {
		transform: translateY(0);
	}

	50% {
		transform: translateY(-8px);
	}
}

.example-text {
	font-size: 0.85rem;
	line-height: 1.4;
	opacity: 0.9;
	font-weight: 500;
}

/* Button Group */
.button-group {
	display: flex;
	gap: 15px;
	margin-top: 30px;
	justify-content: center;
	flex-wrap: wrap;
	animation: fadeInUp 0.8s ease 0.5s both;
}

.primary-btn,
.secondary-btn {
	padding: 14px 32px;
	border: none;
	border-radius: 10px;
	font-size: 1rem;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;
	display: inline-flex;
	align-items: center;
	gap: 10px;
	letter-spacing: 0.3px;
	box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.primary-btn {
	background: white;
	color: #667eea;
}

.primary-btn:hover {
	transform: translateY(-3px);
	box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
	background: rgba(255, 255, 255, 0.95);
}

.primary-btn:active {
	transform: translateY(-1px);
}

.secondary-btn {
	background: rgba(255, 255, 255, 0.2);
	color: white;
	border: none;
	backdrop-filter: blur(10px);
}

.secondary-btn:hover {
	background: rgba(255, 255, 255, 0.3);
	border: none;
	transform: translateY(-3px);
	box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
}

.secondary-btn:active {
	transform: translateY(-1px);
}

.btn-icon {
	font-size: 1.2rem;
}

/* Floating Elements */
/* subtle screen shake animation to highlight issue once on load */
.shake {
	animation: screenShake 0.6s ease-in-out 0s 1;
}

@keyframes screenShake {
	0% {
		transform: translateX(0);
	}

	10% {
		transform: translateX(-6px) rotate(-0.5deg);
	}

	30% {
		transform: translateX(6px) rotate(0.5deg);
	}

	50% {
		transform: translateX(-4px) rotate(-0.3deg);
	}

	70% {
		transform: translateX(3px) rotate(0.2deg);
	}

	90% {
		transform: translateX(-2px) rotate(-0.1deg);
	}

	100% {
		transform: translateX(0) rotate(0);
	}
}

/* Responsive */
/* Tablets (600px - 900px) */
@media (max-width: 900px) {
	.container {
		gap: 35px;
	}

	.title {
		font-size: 2.5rem;
	}

	.subtitle {
		font-size: 1.2rem;
	}

	.description {
		font-size: 0.98rem;
	}

	.icon-circle {
		width: 110px;
		height: 110px;
	}

	.icon-circle svg {
		width: 70px;
		height: 70px;
	}

	.examples-grid {
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: 14px;
	}

	.example-card {
		padding: 18px 12px;
	}

	.example-icon {
		font-size: 1.8rem;
	}

	.example-text {
		font-size: 0.82rem;
	}

	.button-group {
		gap: 14px;
	}

	.primary-btn,
	.secondary-btn {
		padding: 13px 30px;
		font-size: 0.98rem;
	}
}

/* Small Tablets (600px - 768px) */
@media (max-width: 768px) {
	.page-wrapper {
		padding: 32px 16px;
	}

	.container {
		gap: 32px;
	}

	.title {
		font-size: 2.2rem;
	}

	.subtitle {
		font-size: 1.15rem;
	}

	.description {
		font-size: 0.96rem;
	}

	.icon-circle {
		width: 105px;
		height: 105px;
	}

	.icon-circle svg {
		width: 65px;
		height: 65px;
	}

	.examples-grid {
		grid-template-columns: 1fr;
		gap: 12px;
	}

	.example-card {
		padding: 18px 14px;
	}

	.primary-btn,
	.secondary-btn {
		padding: 12px 28px;
		font-size: 0.96rem;
	}
}

/* Mobile (480px - 600px) */
@media (max-width: 600px) {
	.page-wrapper {
		padding: 28px 14px;
	}

	.container {
		gap: 28px;
	}

	.title {
		font-size: 2rem;
	}

	.subtitle {
		font-size: 1.05rem;
	}

	.icon-circle {
		width: 95px;
		height: 95px;
	}

	.button-group {
		flex-direction: column;
		gap: 10px;
	}

	.primary-btn,
	.secondary-btn {
		width: 100%;
		padding: 12px 24px;
	}
}

/* Small Mobile (480px and below) */
@media (max-width: 480px) {
	.page-wrapper {
		padding: 24px 12px;
		align-items: flex-start;
		padding-top: 40px;
	}

	.container {
		gap: 24px;
		max-width: 95%;
	}

	.icon-container {
		margin-bottom: 8px;
	}

	.icon-circle {
		width: 90px;
		height: 90px;
	}

	.icon-circle svg {
		width: 50px;
		height: 50px;
	}

	.title {
		font-size: 1.6rem;
	}

	.subtitle {
		font-size: 1rem;
	}

	.description {
		font-size: 0.88rem;
		line-height: 1.6;
		max-width: 100%;
	}

	.examples-section {
		margin: 20px 0;
		width: 100%;
	}

	.examples-title {
		font-size: 1rem;
		margin-bottom: 16px;
	}

	.examples-grid {
		grid-template-columns: 1fr;
		gap: 10px;
	}

	.example-card {
		padding: 16px 12px;
		gap: 8px;
	}

	.example-icon {
		font-size: 1.5rem;
	}

	.example-text {
		font-size: 0.8rem;
		line-height: 1.3;
	}

	.button-group {
		gap: 10px;
		width: 100%;
	}

	.primary-btn,
	.secondary-btn {
		width: 100%;
		padding: 12px 20px;
		font-size: 0.9rem;
		flex-direction: column;
	}

	.btn-icon {
		font-size: 1rem;
	}
}

/* Ultra Small Mobile (360px and below) */
@media (max-width: 360px) {
	.title {
		font-size: 1.5rem;
	}

	.subtitle {
		font-size: 0.95rem;
	}

	.icon-circle {
		width: 80px;
		height: 80px;
	}

	.icon-circle svg {
		width: 45px;
		height: 45px;
	}

	.primary-btn,
	.secondary-btn {
		padding: 11px 18px;
		font-size: 0.85rem;
	}
}
</style>
