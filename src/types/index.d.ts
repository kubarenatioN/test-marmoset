declare global {
  interface Window {
    /**
     * Yandex Metrika event tracking
     * @param counterId - Counter ID
     * @param type - Type of event
     * @param goal - Goal name
     */
    ym: (counterId: number, type: string, goal: string) => void;
  }
}

export {};
