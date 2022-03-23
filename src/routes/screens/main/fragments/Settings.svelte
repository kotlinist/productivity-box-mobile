<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@rgossiaux/svelte-headlessui';
</script>

<!-- <div
	class="wrapper"
	style="height: 100vh; background-image: url('/backgrounds/plant.jpg'); background-position: center 40%; background-size: auto 100%;'"> -->
<!-- <div class="flex items-center justify-center"> -->
<div
	class="flex items-center justify-center mt-4 text-grey font-bold text-sm px-6 py-3 rounded-lg shadow outline-none mx-6 bg-blue-500 glassmorphism-25">
	<!-- <img src="/kotlinist.jpeg" class="rounded-full" style="height: 80px;" /> -->
	<b class="text-xl bold"><i class="icon-cogs"></i> Настройки</b>
</div>
<!-- </div> -->

<div class="glassmorphism-50 px-6 py-3 mx-6 mt-4 rounded-lg shadow outline-none">
	<b class="text-lg bold">Модули</b>
	<hr
		class="mt-1 mb-3 bg-gradient-to-r from-blue-400 to-indigo-600 border-none h-px rounded-full" />
</div>

<div
	class="mt-4 text-grey font-bold text-sm px-6 py-3 rounded-lg shadow outline-none mx-6 bg-blue-500 glassmorphism-25">
	<!-- {#each Array(50) as _, i}
		<p><i class="icon-check text-lg"></i> {i}</p>
	{/each} -->

	<div class="flex items-center justify-center">
		<div class="w-full">
			<div class="w-full max-w-md p-2 mx-auto bg-white rounded-2xl">
				<!-- foreach -->
				<Disclosure>
					<DisclosureButton
						class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-700 bg-blue-200/40 rounded-lg">
						<span><i class="icon-check"></i> Задачи</span>
						<i class="icon-down-open"></i>
					</DisclosureButton>
					<DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-800">
						<!-- If you're unhappy with your purchase for any reason, email us
				  within 90 days and we'll refund you in full, no questions asked. -->
						<p><i class="icon-check text-xl"></i> Подготовиться к к/р по алгебре</p>
						<p><i class="icon-check text-xl"></i> Подключить новый HDD к серверу</p>
						<p><i class="icon-check-empty text-xl"></i> Настроить бэкап</p>
						<p><i class="icon-check text-xl"></i> Купить чай</p>
						<p><i class="icon-check text-xl"></i> Закоммитить изменения</p>
					</DisclosurePanel>
				</Disclosure>
			</div>

			<div class="w-full mt-2 max-w-md p-2 mx-auto bg-white rounded-2xl">
				<!-- foreach -->
				<Disclosure>
					<DisclosureButton
						class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-700 bg-blue-200/40 rounded-lg">
						<span><i class="icon-star"></i> Привычки</span>
						<i class="icon-down-open"></i>
					</DisclosureButton>
					<DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-800">
						<!-- If you're unhappy with your purchase for any reason, email us
				  within 90 days and we'll refund you in full, no questions asked. -->
						<p><i class="icon-check text-xl"></i> Подготовиться к к/р по алгебре</p>
						<p><i class="icon-check text-xl"></i> Подключить новый HDD к серверу</p>
						<p><i class="icon-check-empty text-xl"></i> Настроить бэкап</p>
						<p><i class="icon-check text-xl"></i> Купить чай</p>
						<p><i class="icon-check text-xl"></i> Закоммитить изменения</p>
					</DisclosurePanel>
				</Disclosure>
			</div>
			<div class="w-full mt-2 max-w-md p-2 mx-auto bg-white rounded-2xl">
				<!-- foreach -->
				<Disclosure>
					<DisclosureButton
						class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-700 bg-blue-200/40 rounded-lg">
						<span><i class="icon-clock-4"></i> Таймер</span>
						<i class="icon-down-open"></i>
					</DisclosureButton>
					<DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-800">
						<!-- If you're unhappy with your purchase for any reason, email us
				  within 90 days and we'll refund you in full, no questions asked. -->
						<p><i class="icon-check text-xl"></i> Подготовиться к к/р по алгебре</p>
						<p><i class="icon-check text-xl"></i> Подключить новый HDD к серверу</p>
						<p><i class="icon-check-empty text-xl"></i> Настроить бэкап</p>
						<p><i class="icon-check text-xl"></i> Купить чай</p>
						<p><i class="icon-check text-xl"></i> Закоммитить изменения</p>
					</DisclosurePanel>
				</Disclosure>
			</div>
			<div class="w-full mt-2 max-w-md p-2 mx-auto bg-white rounded-2xl">
				<!-- foreach -->
				<Disclosure>
					<DisclosureButton
						class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-700 bg-blue-200/40 rounded-lg">
						<span><i class="icon-brush"></i> Внешний вид</span>
						<i class="icon-down-open"></i>
					</DisclosureButton>
					<DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-800">
						<!-- If you're unhappy with your purchase for any reason, email us
				  within 90 days and we'll refund you in full, no questions asked. -->
						<p><i class="icon-check text-xl"></i> Подготовиться к к/р по алгебре</p>
						<p><i class="icon-check text-xl"></i> Подключить новый HDD к серверу</p>
						<p><i class="icon-check-empty text-xl"></i> Настроить бэкап</p>
						<p><i class="icon-check text-xl"></i> Купить чай</p>
						<p><i class="icon-check text-xl"></i> Закоммитить изменения</p>
					</DisclosurePanel>
				</Disclosure>
			</div>
			<div class="w-full mt-2 max-w-md p-2 mx-auto bg-white rounded-2xl">
				<!-- foreach -->
				<Disclosure>
					<DisclosureButton
						class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-700 bg-blue-200/40 rounded-lg">
						<span><i class="icon-bell-alt"></i> Уведомления</span>
						<i class="icon-down-open"></i>
					</DisclosureButton>
					<DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-800">
						<!-- If you're unhappy with your purchase for any reason, email us
				  within 90 days and we'll refund you in full, no questions asked. -->
						<p><i class="icon-check text-xl"></i> Подготовиться к к/р по алгебре</p>
						<p><i class="icon-check text-xl"></i> Подключить новый HDD к серверу</p>
						<p><i class="icon-check-empty text-xl"></i> Настроить бэкап</p>
						<p><i class="icon-check text-xl"></i> Купить чай</p>
						<p><i class="icon-check text-xl"></i> Закоммитить изменения</p>
					</DisclosurePanel>
				</Disclosure>
			</div>
		</div>
	</div>
</div>

<!-- </div> -->
