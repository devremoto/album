using Microsoft.Extensions.Hosting;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace CrossCutting.Services
{
    public abstract class BackgroundService : IHostedService, IDisposable
    {
        private Task _executingTask;
        private readonly CancellationTokenSource _stoppingCts = new();
        protected Func<CancellationToken, Task> action;
        public virtual Task StartAsync(CancellationToken cancellationToken)
        {
            if (action != null)
            {
                return Task.Run(() =>
                {
                    _executingTask = action.Invoke(_stoppingCts.Token);
                    return _executingTask;
                }, cancellationToken);
            }
            else
            {

                return Task.CompletedTask;
            }

        }

        public async Task StopAsync(CancellationToken cancellationToken)
        {
            if (_executingTask == null)
            {
                return;
            }

            try
            {
                _stoppingCts.Cancel();
            }
            finally
            {
                await Task.WhenAny(_executingTask, Task.Delay(Timeout.Infinite, cancellationToken));
            }
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
            _stoppingCts.Cancel();
        }
    }
}
