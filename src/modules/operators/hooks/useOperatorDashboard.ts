import { useMemo } from "react";
import { useGetOperatorDashboardQuery } from "services/api/operators/operators.api";
import { Operator } from "../types/operators.types";

export const useOperatorDashboard = (operators: Operator[]) => {
  // Get unique operator IDs from operators (up to 15) - but keep it stable
  const uniqueOperatorIds = useMemo<(number | null)[]>(() => {
    const uniqueIds: (number | null)[] = Array.from(
      new Set(operators.map((op) => op.id))
    ).slice(0, 15);
    // Pad with nulls to always have 15 elements for stable hook calls
    while (uniqueIds?.length < 15) {
      uniqueIds.push(null);
    }
    return uniqueIds;
  }, [operators]);

  // Fixed number of hooks - always call 15 hooks to maintain hook order
  const dashboardQueries = [
    useGetOperatorDashboardQuery(
      { operatorId: uniqueOperatorIds[0]! },
      { skip: uniqueOperatorIds[0] === null }
    ),
    useGetOperatorDashboardQuery(
      { operatorId: uniqueOperatorIds[1]! },
      { skip: uniqueOperatorIds[1] === null }
    ),
    useGetOperatorDashboardQuery(
      { operatorId: uniqueOperatorIds[2]! },
      { skip: uniqueOperatorIds[2] === null }
    ),
    useGetOperatorDashboardQuery(
      { operatorId: uniqueOperatorIds[3]! },
      { skip: uniqueOperatorIds[3] === null }
    ),
    useGetOperatorDashboardQuery(
      { operatorId: uniqueOperatorIds[4]! },
      { skip: uniqueOperatorIds[4] === null }
    ),
    useGetOperatorDashboardQuery(
      { operatorId: uniqueOperatorIds[5]! },
      { skip: uniqueOperatorIds[5] === null }
    ),
    useGetOperatorDashboardQuery(
      { operatorId: uniqueOperatorIds[6]! },
      { skip: uniqueOperatorIds[6] === null }
    ),
    useGetOperatorDashboardQuery(
      { operatorId: uniqueOperatorIds[7]! },
      { skip: uniqueOperatorIds[7] === null }
    ),
    useGetOperatorDashboardQuery(
      { operatorId: uniqueOperatorIds[8]! },
      { skip: uniqueOperatorIds[8] === null }
    ),
    useGetOperatorDashboardQuery(
      { operatorId: uniqueOperatorIds[9]! },
      { skip: uniqueOperatorIds[9] === null }
    ),
    useGetOperatorDashboardQuery(
      { operatorId: uniqueOperatorIds[10]! },
      { skip: uniqueOperatorIds[10] === null }
    ),
    useGetOperatorDashboardQuery(
      { operatorId: uniqueOperatorIds[11]! },
      { skip: uniqueOperatorIds[11] === null }
    ),
    useGetOperatorDashboardQuery(
      { operatorId: uniqueOperatorIds[12]! },
      { skip: uniqueOperatorIds[12] === null }
    ),
    useGetOperatorDashboardQuery(
      { operatorId: uniqueOperatorIds[13]! },
      { skip: uniqueOperatorIds[13] === null }
    ),
    useGetOperatorDashboardQuery(
      { operatorId: uniqueOperatorIds[14]! },
      { skip: uniqueOperatorIds[14] === null }
    ),
  ];

  // Combine all dashboard data into a single array with metadata
  const allDashboardData = useMemo(() => {
    return uniqueOperatorIds
      .map((operatorId, index) => ({
        data: dashboardQueries[index].data,
        operatorId: operatorId,
        isLoading: dashboardQueries[index].isLoading,
        error: dashboardQueries[index].error,
      }))
      .filter((item) => item.operatorId !== null); // Remove null entries
  }, [dashboardQueries, uniqueOperatorIds]);

  return {
    allDashboardData,
    getDashboardDataById: (operatorId: number) =>
      allDashboardData.find((item) => item.operatorId === operatorId),
  };
};
