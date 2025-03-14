<script setup lang="ts">
import { filterUniqueById } from '@/lib/utils'
import type { CreditsArr } from '@/types/general'
import { computed, onMounted, ref, watch } from 'vue'
import type { Credit, CreditsWrapperProps } from '@/types/cast'
import SwiperSlider from '@/components/ui/SwiperSlider.vue'
import AvatarText from '@/components/ui/AvatarText.vue'
import AvatarTextSkeleton from '@/components/ui/AvatarTextSkeleton.vue'
import { CREDITS_SLIDER_BREAKPOINTS } from '@/constants/general'

const { id, cast, crew } = defineProps<CreditsWrapperProps>()

const currentTab = ref<Credit>('Cast')

const castArr = computed<CreditsArr[]>(() => {
  const castList =
    cast?.map((castItem) => ({
      id: castItem.id,
      original_title: castItem.name,
      title: castItem.character,
      poster_path: castItem.profile_path,
    })) ?? []

  return filterUniqueById(castList)
})

const crewArr = computed<CreditsArr[]>(() => {
  const crewList =
    crew?.map((crewItem) => ({
      id: crewItem.id,
      original_title: crewItem.name,
      title: crewItem.job,
      poster_path: crewItem.profile_path,
    })) ?? []

  return filterUniqueById(crewList)
})

const tabs = computed(() => ({
  Cast: {
    component: SwiperSlider,
    props: { data: castArr.value, breakpoints: CREDITS_SLIDER_BREAKPOINTS },
  },
  Crew: {
    component: SwiperSlider,
    props: { data: crewArr.value, breakpoints: CREDITS_SLIDER_BREAKPOINTS },
  },
}))

const currentComponent = computed(() => tabs.value[currentTab.value])

const updateCurrentTab = () => {
  currentTab.value = tabs.value?.Cast?.props?.data?.length > 0 ? 'Cast' : 'Crew'
}

onMounted(() => {
  updateCurrentTab()
})

watch(
  () => id,
  (newId) => {
    if (newId) updateCurrentTab()
  },
)
</script>

<template>
  <div class="pb-3 sm:pb-10">
    <div class="mt-5 mb-7">
      <template v-for="(cmp, tab) in tabs" :key="tab">
        <BaseButton
          v-if="cmp.props.data.length > 0"
          :mode="currentTab === tab ? 'primary' : 'secondary'"
          @click="currentTab = tab"
        >
          {{ tab }}
        </BaseButton>
      </template>
    </div>
    <KeepAlive>
      <component :is="currentComponent.component" :="currentComponent.props">
        <template #default="{ title, poster_path, original_title }">
          <AvatarText
            v-if="!isLoading"
            :original_title="original_title"
            :title="title"
            :poster_path="poster_path"
          />
          <AvatarTextSkeleton v-else />
        </template>
      </component>
    </KeepAlive>
  </div>
</template>
