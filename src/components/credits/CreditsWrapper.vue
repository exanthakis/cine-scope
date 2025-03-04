<script setup lang="ts">
import { filterUniqueById } from '@/lib/utils'
import type { AvatarTextProps } from '@/types/general'
import { computed, ref, watch } from 'vue'
import CreditsList from './CreditsList.vue'
import type { Credit, CreditsWrapperProps } from '@/types/cast'

const props = defineProps<CreditsWrapperProps>()

const currentTab = ref<Credit>('Cast')

const cast = computed<AvatarTextProps[]>(() => {
  const castList =
    props.cast?.map((castItem) => ({
      id: castItem.id,
      name: castItem.name,
      title: castItem.character,
      path: castItem.profile_path,
    })) ?? []

  return filterUniqueById(castList)
})

const crew = computed<AvatarTextProps[]>(() => {
  const crewList =
    props.crew?.map((crewItem) => ({
      id: crewItem.id,
      name: crewItem.name,
      title: crewItem.job,
      path: crewItem.profile_path,
    })) ?? []

  return filterUniqueById(crewList)
})

const tabs = computed(() => ({
  Cast: {
    component: CreditsList,
    props: { credits: cast.value, type: 'Cast' as Credit, isLoading: props.isLoading },
  },
  Crew: {
    component: CreditsList,
    props: { credits: crew.value, type: 'Crew' as Credit, isLoading: props.isLoading },
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

    <component :is="currentComponent.component" v-bind="currentComponent.props"></component>
  </div>
</template>
