<template>
	<div class="page-wrapper">
		<div class="animated-bg"></div>

		<div class="container">
			<div class="header-section">
				<!-- Animated Favicon -->
				<div class="favicon-container">
					<svg width="100" height="100" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"
						class="favicon-icon">
						<defs>
							<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
								<stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
								<stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
							</linearGradient>

							<radialGradient id="grad2" cx="50%" cy="50%" r="50%">
								<stop offset="0%" style="stop-color:#FF6B9D;stop-opacity:1" />
								<stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
							</radialGradient>
						</defs>

						<!-- Background circle with gradient -->
						<circle cx="32" cy="32" r="32" fill="url(#grad1)" class="icon-bg" />

						<!-- Decorative rotating ring 1 -->
						<circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"
							class="design-element-1" stroke-dasharray="3,4" />

						<!-- Decorative rotating ring 2 -->
						<circle cx="32" cy="32" r="22" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1"
							class="design-element-2" stroke-dasharray="4,3" />

						<!-- Central design palette icon -->
						<g class="design-element-3">
							<!-- Palette shape -->
							<ellipse cx="32" cy="32" rx="14" ry="12" fill="rgba(255,255,255,0.15)" />

							<!-- Color dots on palette -->
							<circle cx="23" cy="28" r="2.5" fill="#FF6B9D" opacity="0.9" />
							<circle cx="28" cy="26" r="2.5" fill="#FFD93D" opacity="0.9" />
							<circle cx="33" cy="27" r="2.5" fill="#6BCB77" opacity="0.9" />
							<circle cx="38" cy="29" r="2.5" fill="#4D96FF" opacity="0.9" />

							<!-- Palette handle -->
							<circle cx="25" cy="38" r="2" fill="rgba(255,255,255,0.7)" />
						</g>

						<!-- Accent sparkles -->
						<g opacity="0.8">
							<circle cx="48" cy="18" r="1.5" fill="#FFD93D" class="design-element-3"
								style="animation-delay: 0.5s;" />
							<circle cx="16" cy="40" r="1.5" fill="#FF6B9D" class="design-element-3"
								style="animation-delay: 1s;" />
							<circle cx="45" cy="45" r="1" fill="#6BCB77" class="design-element-3"
								style="animation-delay: 1.5s;" />
						</g>

						<!-- Vibrant center circle -->
						<circle cx="32" cy="32" r="8" fill="url(#grad2)" opacity="0.8" />

						<!-- Design symbol: stylized 'D' for Design -->
						<path d="M 30 28 L 30 36 M 30 28 Q 35 28 35 32 Q 35 36 30 36" fill="none" stroke="white"
							stroke-width="1.2" stroke-linecap="round" />
					</svg>
				</div>

				<h1 class="title">Smart Design Assistant</h1>
				<p class="subtitle">Get AI-powered feedback on your design requirements</p>
			</div>

			<!-- Image Preview Section -->
			<div v-if="screenshotFile" class="preview-section">
				<div class="screenshot-preview">
					<img :src="screenshotPreview" :alt="screenshotFile.name" class="preview-img" />
					<button @click="removeScreenshot" class="remove-btn" title="Remove image">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
							stroke-width="2">
							<line x1="18" y1="6" x2="6" y2="18"></line>
							<line x1="6" y1="6" x2="18" y2="18"></line>
						</svg>
					</button>
				</div>
			</div>

			<!-- Chat Input Section (ChatGPT-like) -->
			<div class="input-section" @paste="handlePaste" @dragover="dragOver = true" @dragleave="dragOver = false"
				@drop="handleDrop" :class="{ 'drag-active': dragOver }">
				<div class="input-wrapper">
					<textarea ref="textareaRef" v-model="prompt"
						placeholder="Describe your design requirement or challenge..." class="input-textarea"
						@keydown="handleKeydown" @input="adjustTextareaHeight" rows="1"></textarea>

					<div class="input-actions">
						<!-- File Upload -->
						<label class="file-upload-btn" title="Attach image">
							<input type="file" accept="image/*" @change="handleScreenshotUpload" class="file-input" />
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
								stroke-width="2">
								<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
								<polyline points="17 8 12 3 7 8"></polyline>
								<line x1="12" y1="3" x2="12" y2="15"></line>
							</svg>
						</label>

						<!-- Send Button -->
						<button @click="getFeedback" :disabled="!canSend || loading" class="send-btn"
							:class="{ 'active': canSend }" title="Send message (Enter or Cmd+Enter)">
							<svg v-if="!loading" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
								<path
									d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.9429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.01449139 C3.34915502,0.9429026 2.40734225,1.05035989 1.77946707,1.4930535 C0.994623095,2.17837245 0.837654326,3.21159766 1.15159189,3.99707457 L3.03521743,10.4380675 C3.03521743,10.5951649 3.19218622,10.7522623 3.50612381,10.7522623 L16.6915026,11.5377493 C16.6915026,11.5377493 17.1624089,11.5377493 17.1624089,12.0090415 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z">
								</path>
							</svg>
							<span v-if="loading" class="spinner"></span>
						</button>
					</div>
				</div>

				<!-- Drag overlay -->
				<div v-if="dragOver" class="drag-overlay">
					<div class="drag-content">
						<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor"
							stroke-width="2">
							<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
							<polyline points="17 8 12 3 7 8"></polyline>
							<line x1="12" y1="3" x2="12" y2="15"></line>
						</svg>
						<p>Drop image here</p>
					</div>
				</div>
			</div>

			<transition name="fade-scale" appear>
				<div v-if="response" class="result-container">
					<div class="result-card problem-card">
						<div class="card-header">
							<h3>🎯 Problem</h3>
						</div>
						<p class="card-content">{{ response.problem }}</p>
					</div>

					<div class="result-card principles-card">
						<div class="card-header">
							<h3>💡 UX Principles</h3>
						</div>
						<ul class="card-list">
							<li v-for="(item, i) in response.ux_principles" :key="'ux-' + i" class="list-item">
								<span class="bullet">→</span> {{ item }}
							</li>
						</ul>
					</div>

					<div class="result-card suggestions-card">
						<div class="card-header">
							<h3>🎨 UI Suggestions</h3>
						</div>
						<ul class="card-list">
							<li v-for="(item, i) in response.ui_suggestions" :key="'ui-' + i" class="list-item">
								<span class="bullet">→</span> {{ item }}
							</li>
						</ul>
					</div>

					<div class="result-card accessibility-card">
						<div class="card-header">
							<h3>♿ Accessibility Notes</h3>
						</div>
						<ul class="card-list">
							<li v-for="(item, i) in response.accessibility_notes" :key="'a11y-' + i" class="list-item">
								<span class="bullet">→</span> {{ item }}
							</li>
						</ul>
					</div>

					<!-- UI Reference Mockup -->
					<!-- Mock Design Structure -->
					<div v-if="response.mock_design" class="result-card mockup-card">
						<div class="card-header">
							<h3>🧩 Mock Design Structure</h3>
							<p class="reference-description">
								Layout type: {{ response.mock_design.layout_type }}
							</p>
						</div>

						<div class="mock-sections">
							<div v-for="(section, i) in response.mock_design.sections" :key="i" class="mock-section">
								<h4>{{ section.name }}</h4>
								<p>{{ section.description }}</p>

								<ul class="card-list">
									<li v-for="(comp, j) in section.components" :key="j" class="list-item">
										<span class="bullet">→</span> {{ comp }}
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const prompt = ref("");
const response = ref(null);
const loading = ref(false);
const screenshotFile = ref(null);
const screenshotPreview = ref(null);
const textareaRef = ref(null);
const dragOver = ref(false);

// Computed property to check if we can send
const canSend = computed(() => {
	return (prompt.value.trim().length > 0 || screenshotFile.value) && !loading.value;
});

// Auto-expand textarea based on content
const adjustTextareaHeight = () => {
	if (textareaRef.value) {
		nextTick(() => {
			textareaRef.value.style.height = 'auto';
			const newHeight = Math.min(textareaRef.value.scrollHeight, 300); // Max height of 300px
			textareaRef.value.style.height = newHeight + 'px';
		});
	}
};

// Handle keyboard events
const handleKeydown = (event) => {
	// Check for Enter key
	if (event.key === 'Enter') {
		// On Mac: Cmd+Enter, on Windows/Linux: Ctrl+Enter
		const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
		const isModifierKey = isMac ? event.metaKey : event.ctrlKey;

		// If Enter alone is pressed (not Shift+Enter or Cmd/Ctrl+Enter), send
		if (!event.shiftKey && !isModifierKey) {
			event.preventDefault();
			if (canSend.value) {
				getFeedback();
			}
		}
		// Shift+Enter adds a new line (default behavior)
	}
};

const processImageFile = (file) => {
	if (file && file.type.startsWith('image/')) {
		screenshotFile.value = file;
		const reader = new FileReader();
		reader.onload = (e) => {
			screenshotPreview.value = e.target.result;
		};
		reader.readAsDataURL(file);
	}
};

const handleScreenshotUpload = (event) => {
	const file = event.target.files[0];
	processImageFile(file);
};

const handlePaste = (event) => {
	const items = event.clipboardData?.items;
	if (items) {
		for (let item of items) {
			if (item.type.startsWith('image/')) {
				event.preventDefault();
				const file = item.getAsFile();
				processImageFile(file);
				break;
			}
		}
	}
};

const handleDrop = (event) => {
	event.preventDefault();
	dragOver.value = false;

	const items = event.dataTransfer?.items;
	if (items) {
		for (let item of items) {
			if (item.type.startsWith('image/')) {
				const file = item.getAsFile();
				processImageFile(file);
				break;
			}
		}
	}
};

const removeScreenshot = () => {
	screenshotFile.value = null;
	screenshotPreview.value = null;
};

const getFeedback = async () => {
	if (!prompt.value.trim() && !screenshotFile.value) return;

	response.value = null;
	loading.value = true;

	try {
		const formData = new FormData();
		formData.append("userInput", prompt.value);
		if (screenshotFile.value) {
			formData.append("screenshot", screenshotFile.value);
		}

		const res = await axios.post("/api/uiux", formData, {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		});

		if (res.data.out_of_scope) {
			prompt.value = "";
			router.push("/out-of-scope");
			return;
		}

		response.value = res.data;
		prompt.value = "";

		// Reset textarea after sending
		if (textareaRef.value) {
			textareaRef.value.style.height = 'auto';
		}

	} catch (err) {
		console.error(err);
	} finally {
		loading.value = false;
	}
};
</script>
<style scoped>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

::-webkit-scrollbar {
	width: 8px;
	height: 8px;
}

::-webkit-scrollbar-track {
	background: transparent;
}

::-webkit-scrollbar-thumb {
	background: rgba(255, 255, 255, 0.2);
	border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
	background: rgba(255, 255, 255, 0.3);
}

.page-wrapper {
	min-height: 100vh;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	position: relative;
	overflow: hidden;
	padding: 40px 20px;
	display: flex;
	flex-direction: column;
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
	max-width: 900px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 30px;
	flex: 1;
}

.header-section {
	text-align: center;
	color: white;
	padding: 20px 0;
	animation: fadeInDown 0.8s ease;
}

@keyframes fadeInDown {
	from {
		opacity: 0;
		transform: translateY(-20px);
	}

	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.title {
	font-size: 2.5rem;
	font-weight: 700;
	margin-bottom: 10px;
	text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.subtitle {
	font-size: 1.1rem;
	opacity: 0.95;
	font-weight: 300;
	letter-spacing: 0.3px;
}

/* Favicon Display */
.favicon-container {
	display: flex;
	justify-content: center;
	margin-bottom: 20px;
	animation: bounceIn 0.8s ease 0.1s both;
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

.favicon-icon {
	filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.2));
	transition: all 0.3s ease;
}

.favicon-icon:hover {
	filter: drop-shadow(0 12px 30px rgba(0, 0, 0, 0.3));
	transform: scale(1.05);
}

/* SVG Animation Classes */
.favicon-icon .icon-bg {
	animation: bgPulse 3s ease-in-out infinite;
}

.favicon-icon .design-element-1 {
	animation: rotate1 4s linear infinite;
	transform-origin: 32px 32px;
}

.favicon-icon .design-element-2 {
	animation: rotate2 5s linear infinite;
	transform-origin: 32px 32px;
}

.favicon-icon .design-element-3 {
	animation: float 2.5s ease-in-out infinite;
}

@keyframes bgPulse {

	0%,
	100% {
		opacity: 0.95;
	}

	50% {
		opacity: 1;
	}
}

@keyframes rotate1 {
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
}

@keyframes rotate2 {
	from {
		transform: rotate(360deg);
	}

	to {
		transform: rotate(0deg);
	}
}

@keyframes float {

	0%,
	100% {
		transform: translateY(0px);
	}

	50% {
		transform: translateY(-2px);
	}
}

/* ChatGPT-like Input Section */
.input-section {
	position: relative;
	animation: fadeInUp 0.8s ease 0.2s both;
	margin-top: auto;
	padding-bottom: 0;
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

.input-section.drag-active {
	opacity: 0.8;
}

.input-section.drag-active .input-wrapper {
	border: none;
}

.input-wrapper {
	position: relative;
	background: rgba(255, 255, 255, 0.95);
	border: none;
	border-radius: 12px;
	padding: 12px 16px;
	display: flex;
	align-items: flex-end;
	gap: 10px;
	transition: all 0.2s ease;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2),
		0 0 0 1px rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
}

.input-wrapper:hover {
	background: rgba(255, 255, 255, 0.98);
	box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25),
		0 0 0 1px rgba(255, 255, 255, 0.2);
}

.input-wrapper:focus-within {
	background: rgba(255, 255, 255, 1);
	border-color: rgba(102, 126, 234, 0.5);
	box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25),
		0 0 0 2px rgba(102, 126, 234, 0.2);
}

.input-textarea {
	flex: 1;
	border: none;
	outline: none;
	background: transparent;
	color: #1a1a1a;
	font-size: 1rem;
	line-height: 1.5;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
	resize: none;
	min-height: 24px;
	max-height: 300px;
	padding: 4px 0;
	font-weight: 400;
}

.input-textarea::placeholder {
	color: #999;
	font-weight: 400;
}

.input-textarea:focus {
	color: #1a1a1a;
}

.input-actions {
	display: flex;
	align-items: center;
	gap: 8px;
}

.file-upload-btn,
.send-btn {
	cursor: pointer;
	border: none;
	outline: none;
	padding: 6px;
	border-radius: 6px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: transparent;
	color: #999;
	transition: all 0.2s ease;
}

.file-upload-btn:hover {
	background: rgba(102, 126, 234, 0.1);
	color: #667eea;
}

.send-btn {
	color: #ccc;
}

.send-btn:not(:disabled) {
	color: #999;
}

.send-btn.active {
	color: #667eea;
	background: rgba(102, 126, 234, 0.1);
}

.send-btn.active:hover {
	background: rgba(102, 126, 234, 0.2);
	color: #5a6fd8;
}

.send-btn:disabled {
	cursor: not-allowed;
	opacity: 0.5;
}

.file-input {
	display: none;
}

.spinner {
	display: inline-block;
	width: 14px;
	height: 14px;
	border: 2px solid rgba(102, 126, 234, 0.3);
	border-top-color: #667eea;
	border-radius: 50%;
	animation: spin 0.6s linear infinite;
}

@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}

/* Preview Section */
.preview-section {
	animation: fadeInDown 0.3s ease;
	margin-bottom: 20px;
}

.screenshot-preview {
	position: relative;
	width: 100%;
	max-width: 400px;
	margin: 0 auto;
	border-radius: 12px;
	overflow: hidden;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	animation: scaleIn 0.3s ease;
}

@keyframes scaleIn {
	from {
		opacity: 0;
		transform: scale(0.95);
	}

	to {
		opacity: 1;
		transform: scale(1);
	}
}

.preview-img {
	width: 100%;
	height: auto;
	display: block;
}

.remove-btn {
	position: absolute;
	top: 10px;
	right: 10px;
	width: 32px;
	height: 32px;
	border: none;
	border-radius: 6px;
	background: rgba(255, 255, 255, 0.9);
	color: #333;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.2s ease;
	backdrop-filter: blur(10px);
}

.remove-btn:hover {
	background: white;
	transform: scale(1.1);
}

.remove-btn svg {
	stroke-width: 2.5;
}

/* Drag Overlay */
.drag-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(102, 126, 234, 0.1);
	border-radius: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	pointer-events: none;
	backdrop-filter: blur(2px);
	animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
}

.drag-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	color: white;
	text-align: center;
}

.drag-content svg {
	color: rgba(255, 255, 255, 0.8);
	stroke: rgba(255, 255, 255, 0.8);
}

.drag-content p {
	font-size: 1rem;
	font-weight: 500;
}

/* Result Container */
.result-container {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	gap: 20px;
	margin-top: 40px;
	animation: fadeInUp 0.6s ease;
}

.result-card {
	background: rgba(255, 255, 255, 0.95);
	border: none;
	border-radius: 12px;
	padding: 24px;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
	backdrop-filter: blur(10px);
	transition: all 0.3s ease;
	animation: slideUp 0.6s ease;
}

@keyframes slideUp {
	from {
		opacity: 0;
		transform: translateY(20px);
	}

	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.result-card:hover {
	transform: translateY(-5px);
	box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.card-header {
	margin-bottom: 16px;
}

.card-header h3 {
	font-size: 1.1rem;
	color: #1a1a1a;
	margin: 0;
	font-weight: 600;
}

.card-content {
	color: #333;
	line-height: 1.6;
	font-size: 0.95rem;
}

.card-list {
	list-style: none;
	padding: 0;
}

.list-item {
	color: #333;
	margin-bottom: 12px;
	line-height: 1.6;
	font-size: 0.95rem;
	display: flex;
	gap: 12px;
	align-items: flex-start;
}

.list-item:last-child {
	margin-bottom: 0;
}

.bullet {
	color: #667eea;
	font-weight: bold;
	flex-shrink: 0;
	margin-top: 2px;
}

/* UI Reference Mockup Styles */
.mockup-card {
	grid-column: 1 / -1;
	background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(102, 126, 234, 0.05) 100%);
}

.reference-description {
	color: #666;
	font-size: 0.9rem;
	margin-top: 8px;
	margin-bottom: 0;
	line-height: 1.5;
	opacity: 0.8;
}

.mockup-container {
	margin: 20px 0;
	display: flex;
	justify-content: center;
	background: white;
	border-radius: 8px;
	padding: 15px;
	border: 1px solid rgba(102, 126, 234, 0.1);
}

.mockup-svg {
	max-width: 100%;
	height: auto;
}

.reference-details {
	display: grid;
	gap: 15px;
	margin-top: 20px;
	padding-top: 20px;
	border-top: 1px solid rgba(102, 126, 234, 0.1);
}

.theme-info,
.component-info {
	display: flex;
	align-items: center;
	gap: 10px;
}

.theme-info .label,
.component-info .label {
	color: #667eea;
	font-weight: 600;
	font-size: 0.9rem;
}

.theme-info .value,
.component-info .value {
	color: #333;
	background: rgba(102, 126, 234, 0.1);
	padding: 4px 12px;
	border-radius: 6px;
	font-size: 0.9rem;
	font-weight: 500;
}

.color-palette {
	display: grid;
	gap: 12px;
}

.color-palette .label {
	color: #667eea;
	font-weight: 600;
	font-size: 0.9rem;
	display: block;
}

.colors {
	display: flex;
	gap: 20px;
	flex-wrap: wrap;
}

.color-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;
}

.color-box {
	width: 50px;
	height: 50px;
	border-radius: 8px;
	border: 1px solid rgba(0, 0, 0, 0.1);
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	cursor: pointer;
	transition: all 0.2s ease;
}

.color-box:hover {
	transform: scale(1.1);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.color-label {
	font-size: 0.8rem;
	color: #666;
	font-weight: 500;
}

/* Transitions */
.fade-scale-enter-active,
.fade-scale-leave-active {
	transition: all 0.3s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
	opacity: 0;
	transform: scale(0.95);
}

/* Responsive */
/* Large Tablets & Small Desktops (900px - 1024px) */
@media (max-width: 1024px) {
	.container {
		max-width: 85vw;
	}

	.result-container {
		grid-template-columns: repeat(2, 1fr);
		gap: 16px;
	}

	.mockup-card {
		grid-column: 1 / -1;
	}

	.title {
		font-size: 2.2rem;
	}
}

/* Tablets (768px - 900px) */
@media (max-width: 900px) {
	.page-wrapper {
		padding: 24px 16px;
	}

	.container {
		gap: 24px;
	}

	.title {
		font-size: 2rem;
	}

	.subtitle {
		font-size: 1rem;
	}

	.favicon-icon {
		width: 85px;
		height: 85px;
	}

	.header-section {
		padding: 15px 0;
	}

	.input-wrapper {
		padding: 12px 14px;
		gap: 10px;
	}

	.input-textarea {
		font-size: 0.97rem;
	}

	.result-container {
		grid-template-columns: repeat(2, 1fr);
		gap: 16px;
		margin-top: 28px;
	}

	.result-card {
		padding: 18px;
	}

	.card-header h3 {
		font-size: 1.05rem;
	}

	.colors {
		gap: 14px;
	}

	.color-box {
		width: 45px;
		height: 45px;
	}

	.preview-img {
		max-width: 100%;
		height: auto;
	}
}

/* Small Tablets (600px - 768px) */
@media (max-width: 768px) {
	.page-wrapper {
		padding: 20px 14px;
	}

	.container {
		gap: 22px;
	}

	.title {
		font-size: 1.8rem;
	}

	.subtitle {
		font-size: 0.95rem;
	}

	.favicon-icon {
		width: 80px;
		height: 80px;
	}

	.header-section {
		padding: 12px 0;
	}

	.input-wrapper {
		padding: 11px 12px;
		gap: 9px;
	}

	.input-textarea {
		font-size: 0.95rem;
	}

	.file-upload-btn,
	.send-btn {
		padding: 6px;
	}

	.result-container {
		grid-template-columns: 1fr;
		gap: 14px;
		margin-top: 26px;
	}

	.result-card {
		padding: 16px;
	}

	.card-header h3 {
		font-size: 0.95rem;
	}

	.colors {
		gap: 12px;
	}

	.color-box {
		width: 42px;
		height: 42px;
	}

	.reference-details {
		gap: 12px;
	}

	.theme-info,
	.component-info {
		gap: 8px;
	}
}

/* Mobile (480px and below) */
@media (max-width: 480px) {
	.page-wrapper {
		padding: 16px 12px;
	}

	.container {
		gap: 18px;
	}

	.title {
		font-size: 1.5rem;
	}

	.subtitle {
		font-size: 0.9rem;
	}

	.favicon-icon {
		width: 70px;
		height: 70px;
	}

	.header-section {
		padding: 10px 0;
	}

	.input-section {
		margin-top: auto;
		padding-bottom: 0;
	}

	.input-wrapper {
		padding: 10px 11px;
		gap: 7px;
	}

	.input-textarea {
		font-size: 0.9rem;
		min-height: 20px;
	}

	.input-textarea::placeholder {
		font-size: 0.85rem;
	}

	.file-upload-btn,
	.send-btn {
		padding: 5px;
	}

	.result-container {
		grid-template-columns: 1fr;
		gap: 12px;
		margin-top: 20px;
	}

	.result-card {
		padding: 14px;
	}

	.card-header h3 {
		font-size: 0.9rem;
	}

	.card-content,
	.list-item {
		font-size: 0.85rem;
	}

	.mockup-container {
		padding: 10px;
		margin: 12px 0;
	}

	.colors {
		gap: 10px;
		justify-content: space-around;
	}

	.color-box {
		width: 35px;
		height: 35px;
	}

	.color-label {
		font-size: 0.7rem;
	}

	.color-item {
		gap: 6px;
	}

	.reference-details {
		gap: 10px;
	}

	.theme-info,
	.component-info {
		flex-direction: column;
		align-items: flex-start;
		gap: 6px;
	}

	.theme-info .label,
	.component-info .label {
		font-size: 0.85rem;
	}

	.theme-info .value,
	.component-info .value {
		font-size: 0.8rem;
		padding: 3px 10px;
	}

	.preview-section {
		margin-bottom: 15px;
	}

	.screenshot-preview {
		max-width: 90%;
	}

	.remove-btn {
		width: 28px;
		height: 28px;
		top: 8px;
		right: 8px;
	}

	.remove-btn svg {
		width: 16px;
		height: 16px;
	}
}
</style>
