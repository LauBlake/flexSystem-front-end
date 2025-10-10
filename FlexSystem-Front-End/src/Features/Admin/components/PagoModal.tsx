import { useState } from 'react';
import './PagoModal.css';

interface PagoModalProps {
  pedido: {
    id: number;
    cliente: string;
    pedidoId: string;
    importe: number;
  };
  onClose: () => void;
  onConfirmarPago: () => void;
}

const PagoModal = ({ pedido, onClose, onConfirmarPago }: PagoModalProps) => {
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [codigoCVV, setCodigoCVV] = useState('');

  const formatearNumeroTarjeta = (valor: string) => {
    const cleaned = valor.replace(/\s/g, '');
    const grupos = cleaned.match(/.{1,4}/g);
    return grupos ? grupos.join(' ') : cleaned;
  };

  const handleNumeroTarjetaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value.replace(/\s/g, '');
    if (valor.length <= 16 && /^\d*$/.test(valor)) {
      setNumeroTarjeta(formatearNumeroTarjeta(valor));
    }
  };

  const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let valor = e.target.value.replace(/\D/g, '');
    if (valor.length >= 2) {
      valor = valor.slice(0, 2) + '/' + valor.slice(2, 4);
    }
    if (valor.length <= 5) {
      setFechaVencimiento(valor);
    }
  };

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    if (valor.length <= 4 && /^\d*$/.test(valor)) {
      setCodigoCVV(valor);
    }
  };

  const handleProcesarPago = () => {
    if (!numeroTarjeta || !fechaVencimiento || !codigoCVV) {
      alert('Por favor complete todos los campos de la tarjeta');
      return;
    }
    
    if (numeroTarjeta.replace(/\s/g, '').length !== 16) {
      alert('El número de tarjeta debe tener 16 dígitos');
      return;
    }

    if (codigoCVV.length < 3) {
      alert('El CVV debe tener al menos 3 dígitos');
      return;
    }

    onConfirmarPago();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="pago-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          ✕
        </button>

        <h2 className="modal-title">Detalles de Pago</h2>
        <p className="modal-subtitle">
          {pedido.pedidoId} - {pedido.cliente}
        </p>

        {/* Tarjeta Visual */}
        <div className="tarjeta-credito">
          <div className="tarjeta-chip">
            <div className="chip-icon">📱</div>
          </div>
          <div className="tarjeta-numero">
            {numeroTarjeta || '1234 5678 9012 3456'}
          </div>
          <div className="tarjeta-info">
            <div className="tarjeta-fecha">
              <span className="info-label">VALID THRU</span>
              <span className="info-value">{fechaVencimiento || '12/26'}</span>
            </div>
            <div className="tarjeta-cvv">
              <span className="cvv-dots">•••</span>
            </div>
          </div>
        </div>

        {/* Formulario de Pago */}
        <div className="pago-form">
          <div className="form-group">
            <label>Número de tarjeta</label>
            <input
              type="text"
              value={numeroTarjeta}
              onChange={handleNumeroTarjetaChange}
              placeholder="1234 5678 9012 3456"
              className="pago-input"
              maxLength={19}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Fecha de vto</label>
              <input
                type="text"
                value={fechaVencimiento}
                onChange={handleFechaChange}
                placeholder="MM/AA"
                className="pago-input"
                maxLength={5}
              />
            </div>

            <div className="form-group">
              <label>Código CV</label>
              <input
                type="text"
                value={codigoCVV}
                onChange={handleCVVChange}
                placeholder="123"
                className="pago-input"
                maxLength={4}
              />
            </div>
          </div>

          <div className="pago-total">
            <span>Total a pagar:</span>
            <strong>${pedido.importe.toLocaleString('es-AR')}</strong>
          </div>

          <button 
            className="btn-procesar-pago"
            onClick={handleProcesarPago}
          >
            Procesar Pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default PagoModal;
