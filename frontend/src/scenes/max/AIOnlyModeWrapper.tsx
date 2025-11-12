import { useValues } from 'kea'
import { useState } from 'react'

import { IconX } from '@posthog/icons'

import { FEATURE_FLAGS } from 'lib/constants'
import { LemonButton } from 'lib/lemon-ui/LemonButton'
import { featureFlagLogic } from 'lib/logic/featureFlagLogic'

import { MaxInstance } from './Max'

export function AIOnlyModeWrapper({ children }: { children: React.ReactNode }): JSX.Element {
    const { featureFlags } = useValues(featureFlagLogic)
    const isAIOnlyModeEnabled = featureFlags[FEATURE_FLAGS.AI_ONLY_MODE]
    const [isAIOnlyModeActive, setIsAIOnlyModeActive] = useState(true)

    const exitAIOnlyMode = (): void => {
        setIsAIOnlyModeActive(false)
    }

    if (isAIOnlyModeEnabled && isAIOnlyModeActive) {
        return (
            <div className="fixed inset-0 bg-bg-light dark:bg-bg-dark flex flex-col">
                <MaxInstance tabId="ai-only-mode" sidePanel AIOnlyMode={true} />
                <LemonButton
                    type="secondary"
                    size="small"
                    icon={<IconX />}
                    onClick={exitAIOnlyMode}
                    className="fixed bottom-4 right-4 z-50"
                    tooltip="Exit AI-only mode"
                >
                    Exit AI mode
                </LemonButton>
            </div>
        )
    }

    return <>{children}</>
}
