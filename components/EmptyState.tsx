"use client"

import Heading from "./Heading";
import { Button } from "./ui/button";

interface EmptyStateProps {
    title?: string
    subtitle?: string
    showReset?: boolean
}

const EmptyState = ({
    title = "Geen resultaten gevonden",
    subtitle,
    showReset
}: EmptyStateProps) => {
    return (
        <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
            <Heading
                center
                title={title}
                subtitle={subtitle}
            />
            <div className="w-48 mt-4">
                {showReset && (
                    <Button variant="outline">
                        Remove all filters
                    </Button>
                )}
            </div>
        </div>
    );
}

export default EmptyState;