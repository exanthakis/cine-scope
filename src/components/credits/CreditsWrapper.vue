<script setup lang="ts">
import { filterUniqueById } from '@/lib/utils'
import type { CreditsArr } from '@/types/general'
import { computed, ref, watch } from 'vue'
import type { Credit, CreditsWrapperProps } from '@/types/cast'
import SwiperSlider from '@/components/ui/SwiperSlider.vue'
import AvatarText from '@/components/ui/AvatarText.vue'
import AvatarTextSkeleton from '@/components/ui/AvatarTextSkeleton.vue'
import { CREDITS_SLIDER_BREAKPOINTS } from '@/constants/general'

const props = defineProps<CreditsWrapperProps>()

const currentTab = ref<Credit>('Cast')

const cast = computed<CreditsArr[]>(() => {
  const castList =
    props.cast?.map((castItem) => ({
      id: castItem.id,
      name: castItem.name,
      title: castItem.character,
      poster_path: castItem.profile_path,
    })) ?? []

  return filterUniqueById(castList)
})

const crew = computed<CreditsArr[]>(() => {
  const crewList =
    props.crew?.map((crewItem) => ({
      id: crewItem.id,
      name: crewItem.name,
      title: crewItem.job,
      poster_path: crewItem.profile_path,
    })) ?? []

  return filterUniqueById(crewList)
})

const tabs = computed(() => ({
  Cast: {
    component: SwiperSlider,
    props: { data: cast.value, breakpoints: CREDITS_SLIDER_BREAKPOINTS },
  },
  Crew: {
    component: SwiperSlider,
    props: { data: crew.value, breakpoints: CREDITS_SLIDER_BREAKPOINTS },
  },
}))

const currentComponent = computed(() => tabs.value[currentTab.value])

watch(
  () => props.id,
  () => {
    if (props.id) return (currentTab.value = 'Cast')
  },
)
</script>

<template>
  <div class="pb-10">
    <div class="mt-5 mb-7">
      <BaseButton
        v-for="(_, tab) in tabs"
        :key="tab"
        :mode="currentTab === tab ? 'primary' : 'secondary'"
        :isLink="false"
        @click="currentTab = tab"
      >
        {{ tab }}
      </BaseButton>
    </div>

    <component :is="currentComponent.component" :="currentComponent.props">
      <template #default="{ title, poster_path }">
        <AvatarText v-if="!isLoading" :name="'name'" :title="title" :poster_path="poster_path" />
        <AvatarTextSkeleton v-else />
      </template>
    </component>
  </div>
</template>
