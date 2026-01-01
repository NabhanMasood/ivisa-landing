<template>
  <div
    class="border-b flex overflow-x-auto"
    style="border-color: #e4e4e8; -webkit-overflow-scrolling: touch;"
  >
    <button
      v-for="(traveler, index) in travelers"
      :key="`traveler-${traveler.id || 'no-id'}-${index}-${traveler.firstName || ''}-${traveler.lastName || ''}`"
      @click="$emit('select', traveler.id || null, index)"
      class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 transition-colors relative"
      :class="[
        isSelected(traveler, index)
          ? 'border-[#1ECE84] text-[#1ECE84]'
          : 'border-transparent text-gray-600 hover:text-gray-900',
      ]"
    >
      <div class="flex items-center gap-2">
        <span>{{ getTravelerName(traveler, index) }}</span>
        <!-- Status Badge -->
        <span
          class="px-2 py-0.5 text-xs rounded-full font-medium"
          :class="getStatusClass(traveler.id || null, index)"
        >
          {{ getStatus(traveler.id || null, index) }}
        </span>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
interface Traveler {
  id?: number | null;
  firstName?: string;
  lastName?: string;
  email?: string;
}

const props = defineProps<{
  travelers: Traveler[];
  selectedId: number | null;
  selectedIndex: number;
  submissionStatus: Record<string, 'submitted' | 'pending' | 'not_started'>;
  completedTravelers: Set<string>;
}>();

defineEmits<{
  select: [id: number | null, index: number];
}>();

const isSelected = (traveler: Traveler, index: number): boolean => {
  return props.selectedId === (traveler.id || null) && props.selectedIndex === index;
};

const getTravelerKey = (travelerId: number | null, index: number): string => {
  return travelerId !== null ? `traveler-${travelerId}` : `traveler-index-${index}`;
};

const getTravelerName = (traveler: Traveler, index: number): string => {
  if (!traveler) return `Traveler ${index + 1}`;
  const firstName = traveler.firstName || '';
  const lastName = traveler.lastName || '';
  const fullName = `${firstName} ${lastName}`.trim();
  return fullName || `Traveler ${index + 1}`;
};

const getStatus = (travelerId: number | null, index: number): string => {
  const travelerKey = getTravelerKey(travelerId, index);

  // Check if already submitted
  if (props.submissionStatus[travelerKey] === 'submitted') {
    return 'Submitted';
  }

  // Check if form is completed (all required fields filled)
  if (props.completedTravelers.has(travelerKey)) {
    return 'Complete';
  }

  // Check if in progress
  if (props.submissionStatus[travelerKey] === 'pending') {
    return 'In Progress';
  }

  return 'To Fill';
};

const getStatusClass = (travelerId: number | null, index: number): string => {
  const status = getStatus(travelerId, index);

  switch (status) {
    case 'Submitted':
      return 'bg-green-100 text-green-700';
    case 'Complete':
      return 'bg-blue-100 text-blue-700';
    case 'In Progress':
      return 'bg-yellow-100 text-yellow-700';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};
</script>
