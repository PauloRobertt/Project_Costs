package br.com.costs.Costs.Model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "Projeto")
public class Projeto {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "nome", length = 100, nullable = false)
	@NotBlank(message = "Nome é obrigatório")
	private String Nome;
	
	@Column(name = "orcamento", nullable = false)
	@NotBlank(message = "Orcamento é obrigatório")
	private float Orcamento;
	
	@Column(name = "categoria", length = 50, nullable = false)
	@NotBlank(message = "Categoria é obrigatório")
	private String Categoria;
	
	@Column(name = "totalUtilizado", nullable = true)
	private float TotalUtilizado;
	
	@OneToMany(mappedBy = "projeto", cascade = CascadeType.ALL)
	@Column(name = "servicos")
	private List<Servico> servicos;

	public List<Servico> getServicos() {
		return servicos;
	}

	public void setServicos(List<Servico> servicos) {
		this.servicos = servicos;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return Nome;
	}

	public void setNome(String nome) {
		Nome = nome;
	}

	public float getOrcamento() {
		return Orcamento;
	}

	public void setOrcamento(float orcamento) {
		Orcamento = orcamento;
	}

	public String getCategoria() {
		return Categoria;
	}

	public void setCategoria(String categoria) {
		Categoria = categoria;
	}

	public float getTotalUtilizado() {
		return TotalUtilizado;
	}

	public void setTotalUtilizado(float totalUtilizado) {
		TotalUtilizado = totalUtilizado;
	}
	
    public void adicionarCustoServico(float custo) {
        this.TotalUtilizado += custo;
    }
    
    public void removerCustoServico(float custo) {
        this.TotalUtilizado -= custo;
    }
}
